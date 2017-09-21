import React, { Component } from 'react';

import { flipCard } from '../../utils/deckUtils';
import { getRank, positionCard, styleCard } from '../../utils/cardStyleUtils';
import { FrontFace, BackFace } from '../Face/Face';

class CardTable extends Component {

  render() {
    const { deck, currentCardIndex, reveal, playMode, advance, reverse } = this.props.passedProps;

    return (
      <div className="table">

        <div className="card-space">
          <div className="place-cards-here" onClick={reverse}></div>

          <div className="center-of-table">
            <div className="upper bar">
              <button
                disabled={!reveal && 'disabled'}
                onClick={ _ => {
                  advance();
                  playMode && this.updateScore(true);
                }}>
                Right
              </button>
            </div>
            <div className="lower bar">
              <button 
                disabled={!reveal && 'disabled'}
                onClick={ _ => {
                  advance();
                  playMode && this.updateScore(false);
                }}>
                Wrong
              </button>
            </div>
          </div>

          <div className="place-cards-here" onClick={advance}></div>

          { deck && deck.map((card, i) => (
            <div className="card-container" key={i}
              style={positionCard(i, currentCardIndex, deck.length)}>

              <div className="card"
                style={flipCard(i, currentCardIndex, reveal)}
                onClick={
                  i < currentCardIndex ? reverse :
                  i > currentCardIndex ? advance :
                  i === currentCardIndex ? _ => this.setState({reveal: !reveal}) :
                  null 
                }>
                <FrontFace rank={getRank(i)} style={styleCard(i, currentCardIndex, 'front')}>
                  <span>{ card.front }</span>
                </FrontFace>

                <BackFace style={styleCard(i, currentCardIndex, 'back')}>
                  <span>{ card.back }</span>
                </BackFace>
              </div>

            </div>
          ))}

        </div>
      </div>
    )
  }
}

export default CardTable;