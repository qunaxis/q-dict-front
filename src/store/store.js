import { observable, computed, action } from 'mobx';
import axios from 'axios'
import shortid from 'shortid'
import saveToLS from './saveToLS'

import User from './user'

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
    @observable rSelected = 1
    @observable wSelected = null
    @observable user = new User()
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
        let trCurrent = this.word.ru.peek()

        if (tSelected != undefined) {
            tSelected = tSelected.ru.peek()
            tSelected.forEach(tr => {
                const key = trCurrent.indexOf(tr)
                if (key != undefined && key != -1) {
                    trCurrent.splice(key, 1)
                }
            })
        }

        return trCurrent
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

    @action selectWord(wordId) {
        this.wSelected = wordId
        this.word.en = search('id', this.wSelected, this.dictionary).en
        this.getTranslate()
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


    selectedResource() {
        const resources = [
            'google',
            'yandex'
        ]
        return resources[this.rSelected]
    }
}
    

let store = new Store

saveToLS('q-dict', store, 1)
    

export default store