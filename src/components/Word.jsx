import React from 'react'



const Word = (props) => {
    const { word, wSelected, handleChooseWord } = props

    return (
        <tr>
            <td>
                <p 
                    className={ wSelected == word.id ? 'selected-word' : '' } 
                    onClick={ () => handleChooseWord(word.id) }
                >
                    { word.en }
                </p>
            </td>
            <td>
            { 
                word.ru != undefined ? word.ru.sort().map((tr, id) => 
                    <p key={ id }>{ tr }</p>) : ''
            }
            </td>
            <td>{ word.transcription }</td>
        </tr>
    )
}



export default Word