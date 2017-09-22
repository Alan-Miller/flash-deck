import React from 'react';

import { flipCard } from '../../utils/deckUtils';
import { getRank, positionCard, styleCard } from '../../utils/cardStyleUtils';
import { Pip } from '../Pip/Pip';

export function Card(props) {
  const { card, i, deck, currentCardIndex, reveal, playMode, advance, buttonText } = props.passedProps;

  const styleFront= styleCard(i, currentCardIndex, 'front');
  const styleBack = styleCard(i, currentCardIndex, 'back');
  
  const handleClickCard = _ => {
    if (i < currentCardIndex) advance(-1); // click left stack to reverse
    if (i > currentCardIndex) advance(1); // click right stack to advance
    if (i === currentCardIndex) advance(0); // flip middle card
  }

  return (
    <div className="card-container" key={i}
      style={positionCard(i, currentCardIndex, deck.length)}>

      <div className="card"
        style={flipCard(i, currentCardIndex, reveal)}
        onClick={handleClickCard}>

        <div className="front face" style={styleFront} >
          {playMode && <Pip className="upper pipArea" rank={getRank(i)} style={styleFront} />}
          <span className="content">
            <span>{ card.front }</span>
          </span>
          {playMode && <Pip className="lower pipArea" rank={getRank(i)} style={styleFront} />}
        </div>

        <div className="back face" style={styleBack}>
          <span className="content">
            <span>{ card.back }</span>
          </span>
        </div>

      </div>

    </div> // end of card-container
  )
}