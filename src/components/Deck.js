import React from 'react';
import Card from './Card/Card';

import { flip } from '../utils/cardUtils';
import { getRank } from '../utils/playUtils';
import cardStyles from '../styles/modularStyles/cardStyleObject';

const { firstCardContainerStyles, firstFaceStyles, cardContainerStyles } = cardStyles;

export default function Deck(props) {
  const { deckInPlay, firstCardIndex } = props;
  let z = Array.from(Array(53).keys()).reverse();
  z.pop();

  return (
    <section id="deck">
      { 
        deckInPlay.map((card, index) => (
          <div
            className="card-container" 
            id={index}
            key={index}
            style={Object.assign({}, cardContainerStyles, firstCardIndex === index && firstCardContainerStyles, {'zIndex': z[index]})}
            onClick={(e) => flip(e, index)}>
            <Card 
              card={card}
              rank={getRank(index)}
              topFunction={(e) => { 
                this.dropCardAndSetDeck(e, 'left'); 
                this.updateScore(1); }}
              bottomFunction={(e) => {
                this.dropCardAndSetDeck(e, 'right'); 
                this.updateScore(-1); }}
              cardStyle={Object.assign({}, firstCardIndex === index && firstFaceStyles)}/>
          </div>
        ))
      } 
    </section>
  )
}