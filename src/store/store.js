import { observable, computed, action } from 'mobx';
import axios from 'axios'
import shortid from 'shortid'
import saveToLS from './saveToLS'

// seacrh in array
function search(prop, value, array){
    for (var i=0; i < array.length; i++) {
        if (array[i][prop] == value) {
            return array[i]
        }
    }
}

class Word {
    id = shortid.generate()
    @observable en = ''
    @observable ru = []
    @observable transcription = ''

    constructor(word) {
        this.en = word ? word.en : '',
        this.ru = word ? word.ru : [],
        this.transcription = word ? word.transcription : ''
    }
}

class Store {
    @observable dictionary = []
    @observable word = {}
    @observable status = 'wait' // 'wait' | 'done' | 'error'
    @observable errorMessage = ''
    @observable rSelected = 1;
    @observable wSelected = null;

    constructor() {
        this.word = new Word()
        // let locStor = JSON.parse(localStorage['q-dict'])
        // if (locStor == undefined) {
        //     this.word = new Word()
        // } else {
        //     this.word = locStor.word,
        //     this.dictionary = locStor.dictionary,
        //     this.rSelected = locStor.rSelected
        // }
    }

    @action addTranslate(tr) {
            if (this.dictionary.length == 0) { 
                this.dictionary.push({
                    ...this.word,
                    ru: [tr]                    
                })   
            } else {
                let pushed = false
                this.dictionary.map(word => {
                    if (word.en == this.word.en && !pushed) { 
                        word.ru.push(tr)
                        pushed = true
                    }
                })            
                if (!pushed) {
                    this.dictionary.push({
                        ...this.word,
                        ru: [tr]                    
                    })        
                }
            }
            this.word.ru.splice(this.word.ru.indexOf(tr), 1)
            this.word = new Word(this.word)
        }


    @computed get filteredTranslations() {
        let tSelected = search('id', this.wSelected, this.dictionary)
        // tSelected.length > 0 ? tSelected.ru.peek() : ''
        let trCurrent = this.word.ru.peek()

        console.groupCollapsed('filteredTranslations')
        console.group('START')
            console.log(tSelected)
            console.log(trCurrent)
        console.groupEnd()

        if (tSelected != undefined) {
            tSelected = tSelected.ru.peek()
            tSelected.forEach(tr => {
                const key = trCurrent.indexOf(tr)
                if (key != undefined && key != -1) {
                    console.log(key + 'true' + trCurrent[key])
                    trCurrent.splice(key, 1)
                }
            })
        }
        
        console.group('STOP')
            console.log(tSelected)
            console.log(trCurrent)
        console.groupEnd()
        console.groupEnd()

        return trCurrent
    }

    @action selectWord(wordId) {
        this.wSelected = wordId
        this.word.en = search('id', this.wSelected, this.dictionary).en
        this.getTranslate()
    }

    @computed get filteredWords() {
        function checkRu(tr, matchesFilter) {
            let isHere = false;
            tr.map(value => {
                matchesFilter.test(value) ? isHere = true : ''
            })
            return isHere
        }

        let matchesFilter = new RegExp(this.word.en, 'i')      
        let filteredWords = this.dictionary.filter(word => !this.word.en || matchesFilter.test(word.en) || checkRu(word.ru, matchesFilter) )
        return filteredWords
    }

    selectedResource() {
        const resources = [
            'google',
            'yandex'
        ]
        return resources[this.rSelected]
    }

    @action getTranslate() {
        this.status = 'wait'
        let timestamp = Date.now()
        axios.post('//q-dict-server.herokuapp.com/translate', { data: this.word.en, resource: this.selectedResource() })
            .then(
                res => {
                    if(timestamp < Date.now()) { // Нужно для фикса задержек асинхронных запросов
                        this.word = {
                            ...this.word,
                            ru: res.data.word.ru,
                            transcription: res.data.word.transcription
                        }
                        this.status = 'done'
                        this.errorMessage = ''
                    }
                }
            )
            .catch(error => {
                this.status = 'error'
                this.errorMessage = error
            })
    }
}
    

let store = new Store

saveToLS('q-dict', store, 1)
    

export default store