import React, { Component } from 'react';

import { Card } from '../Card/Card';

class CardTable extends Component {

  render() {
    const { deck, reveal, playMode, advance, buttonText } = this.props.passedProps;

    return (
      <div className="table">
        <div className="card-space">
          
          <div className="place-cards-here" onClick={ _ => advance(-1) }></div>

          <div className="center-of-table">
            <div className="upper bar">
              { 
                buttonText[0] && // If buttonText[0] is not empty string, display button text
                <button
                  disabled={!reveal && 'disabled'}
                  onClick={ _ => { advance(1); playMode && this.updateScore(true); }} >
                    { buttonText[0] }
                </button>
              }
            </div>
            <div className="lower bar">
              { 
                buttonText[1] && // If buttonText[1] is not empty string, display button text
                <button 
                  disabled={!reveal && 'disabled'}
                  onClick={ _ => { advance(1); playMode && this.updateScore(false); }} >
                    { buttonText[1] }
                </button>
              }
            </div>
          </div>

          <div className="place-cards-here" onClick={ _ => advance(1) }></div>

          { // Display cards
            deck && deck.map((card, i) => (
              <Card key={i} passedProps={Object.assign({}, this.props.passedProps, {card, i})} />
            ))
          }

        </div>  
      </div> // End of table
    )
  }
}

export default CardTable;