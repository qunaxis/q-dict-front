import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'



const TranslationList = (props) => {
    const { filteredTranslations, handleAddTranslate } = props

    if (filteredTranslations.lenght != 0) {
        return (
            <ListGroup>            
                { filteredTranslations.map((word, key) => 
                    <ListGroupItem 
                        key={ key }
                        className='translated-word'
                        onClick={ () => handleAddTranslate(word) }
                    >
                        <p>{ word }</p>
                    </ListGroupItem> 
                )}              
            </ListGroup>      
        )  
    } else {
        return null
    }               
}



export default TranslationList