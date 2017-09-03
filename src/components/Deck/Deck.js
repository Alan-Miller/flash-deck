import React from 'react';
import Pip from '../Card/Pip/Pip';
import CardButton from '../Card/CardButton/CardButton';

import { flip } from '../../utils/cardUtils';
import { getRank } from '../../utils/playUtils';
import cardStyles from '../Card/cardStyleObject';

const { cardContainerStyles, firstCardContainerStyles, firstCardStyles } = cardStyles;

export default function Deck(props) {
  const { currentDeck, firstCardIndex, text1, buttonFn1, text2, buttonFn2 } = props;
  let z = Array.from(Array(53).keys()).reverse();
  z.pop();

  return (
    <section id="deck">
      { 
        currentDeck.map((card, index) => (
          <div className="card-container" 
            id={index}
            key={index}
            style={Object.assign({}, cardContainerStyles, firstCardIndex === index && firstCardContainerStyles, {'zIndex': z[index]})}
            onClick={(e) => flip(e, index)}>
            
            <div className="Card card">
              <div className="front face"
                style={Object.assign({}, firstCardIndex === index && firstCardStyles)}>

                <Pip className="upper pipArea">
                  { getRank(index) }
                </Pip>

                <div className="content">
                  { card.front }
                </div>

                <Pip className="lower pipArea">
                  { getRank(index) }
                </Pip>
              </div>

              <div className="back face"
                style={Object.assign({}, firstCardIndex === index && firstCardStyles)}>
                
                { card.back }

                <CardButton className="right answer" 
                  onClick={buttonFn1}>
                  { text1 }
                </CardButton>

                <CardButton className="wrong answer" 
                  onClick={buttonFn2}>
                  { text2 }
                </CardButton>
              </div>
            </div>

          </div>
        ))
      } 
    </section>
  )
}