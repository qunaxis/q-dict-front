import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'



const TranslationList = (props) => {
    const { filteredTranslations, handleAddTranslate } = props

    if (filteredTranslations.lenght != 0) {
        return (
            <ListGroup>            
                { filteredTranslations.map((word, key) => 
                    <ListGroupItem className='translated-word' key={ key }>
                        <p>{ word }</p>
                        <Button outline onClick={ () => handleAddTranslate(word) }>+</Button>
                    </ListGroupItem> 
                )}              
            </ListGroup>      
        )  
    } else {
        return null
    }               
}



export default TranslationList