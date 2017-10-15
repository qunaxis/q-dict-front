import React, { Component } from 'react'
import { observer } from 'mobx-react';

import { Container, Row, Col, Table, Input, Button, ButtonGroup, ListGroup, ListGroupItem, Alert } from 'reactstrap'



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

  hanldeAddTranslate = (word) => {
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
    const template = filteredWords.map((word => 
      <tr key={ word.id }>
        <td><span className={ store.wSelected == word.id ? 'selected-word' : '' } onClick={ () => this.handleChooseWord(word.id) }>{ word.en }</span></td>
        <td>
          { word.ru != undefined ? word.ru.sort().map((tr, id) => 
            <p key={ id }>{ tr }</p>) : '' }
        </td>
        <td>{ word.transcription }</td>
      </tr>
    ))

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
            {/* <p className='transcription'>{ store.filteredTranslations }</p> */}
          </Col>
          {
            store.filteredTranslations.lenght != 0  
            ? <Col xs={12} md={4}> 
                <ListGroup>
                  { store.filteredTranslations.map((word, key) => 
                    <ListGroupItem className='translated-word' key={ key }>
                      <p>{ word }</p>
                      <Button outline onClick={ () => this.hanldeAddTranslate(word) }>+</Button>
                    </ListGroupItem> 
                  )}              
                </ListGroup>
              </Col>
            : ''
          }
        </Row>
        <Table hover>
          <thead>
            {/* <td></td> */}
            <tr>
              <th>English</th>
              <th>Russian</th>
              <th>Transcription</th>
            </tr>
          </thead>
          <tbody>
            { template }
          </tbody>
        </Table>
      </Container>
    )
  }
}