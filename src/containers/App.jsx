import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { Container, Row, Col, Table, Input, Button, ButtonGroup, Alert } from 'reactstrap'

import Word from '../components/Word'
import TranslationList from '../components/TranslationList'



@observer
export default class App extends Component {
  onRadioBtnClick(rId) {
    this.props.store.rSelected = rId
    this.props.store.getTranslate()
  }

  handleSearch = (e) => {
    this.props.store.word.en = e.target.value
    this.props.store.getTranslate()
  }

  handleAddTranslate = (word) => {
    this.props.store.addTranslate(word)
  }

  handleChooseWord = (wordId) => {
    this.props.store.selectWord(wordId)
  }

  // onKeyPress
  // createNew = (e) => {
  //   if (e.which === 13) {
  //     this.props.store.addWord()
  //     e.target.value = ''
  //   }
  // }

  render() {
    const { store } = this.props
    const { filteredWords } = store

    return (
      <Container>
        <Row className='header'>
          <Col xs={12} md={6}>
            <h1>Q-Dictionary</h1>
            <ButtonGroup>
              <Button outline color='primary' onClick={() => this.onRadioBtnClick(0)} active={store.rSelected === 0}>Google</Button>
              <Button outline color='primary' onClick={() => this.onRadioBtnClick(1)} active={store.rSelected === 1}>Yandex</Button>
            </ButtonGroup>
          <span className='status'>{ store.status }</span>
          </Col>
          <Col xs={12} md={6}>
          {
            store.errorMessage ?
              <Alert color='warning'>
                { store.errorMessage.toString() }
              </Alert>
            : ''
          }
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
              <Input
                type='textarea'
                value={ store.word.en }
                onChange={ this.handleSearch }
                placeholder='Enter the word/phrase...' 
              />
          </Col>
          <Col xs={12} md={4}>
            <p className='transcription'>{ store.word.transcription }</p>
          </Col>
          <Col xs={12} md={4}> 
            <TranslationList filteredTranslations={ store.filteredTranslations } handleAddTranslate={ this.handleAddTranslate } />
          </Col>
        </Row>
        <Table hover>
          <thead>
            <tr>
              <th>English</th>
              <th>Russian</th>
              <th>Transcription</th>
            </tr>
          </thead>
          <tbody>
            { 
              filteredWords.map(word => 
                <Word key={ word.id } word={ word } wSelected={ store.wSelected } handleChooseWord={ this.handleChooseWord } />
              )
            }      
          </tbody>
        </Table>
      </Container>
    )
  }
}