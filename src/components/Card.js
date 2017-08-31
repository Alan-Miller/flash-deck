import React from 'react';
import CardButton from './CardButton';
import Pip from './Pip';

export default function Card(props) {

  return (
    <div className="Card card">
      <div 
        className="front face"
        style={Object.assign({}, props.firstCardIndex === props.index && props.firstFaceStyles)}>
        
        <Pip className="upper pipArea">
          { props.getRank(props.index) }
        </Pip>

        <div className="content">
          { props.card.front }
        </div>
        
        <Pip className="lower pipArea">
          { props.getRank(props.index) }
        </Pip>

      </div>

      <div 
        className="back face"
        style={Object.assign({}, props.firstCardIndex === props.index && props.firstFaceStyles)}>

        { props.card.back }

        <CardButton className="right answer" 
          tally={props.tally} 
          dropCardAndSetDeck={props.dropCardAndSetDeck}>
          Right
        </CardButton>

        <CardButton className="wrong answer" 
          tally={props.tally} 
          dropCardAndSetDeck={props.dropCardAndSetDeck}>
          Wrong
        </CardButton>

      </div>
    </div>
  )
}