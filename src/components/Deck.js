import React, { Component } from 'react'

import { connect } from 'react-redux';
import { setCards, setDeckInPlay } from '../redux/reducer';

import { getDisplayName } from '../services/service';
import { getAllCards } from '../services/cardService';
import cardStyles from '../styles/modularStyles/cardStyleObject';

// import { buildDeck } from '../utils/deckUtils';
import { flip, dropCard } from '../utils/cardUtils';
import { getRank } from '../utils/playUtils';

class Deck extends Component {
  constructor() {
    super()

    this.state = {};
  }

  render() {
    const { cardContainerStyles, firstCardContainerStyles, firstFaceStyles } = cardStyles;
    let z = Array.from(Array(53).keys()).reverse();
    z.pop();

    return (
      <div id="deck">
        { 
          !this.props.deckInPlay ? null : this.props.deckInPlay.map((card, index) => (
            <div
              className="card-container" 
              id={index}
              key={index}
              style={Object.assign({}, cardContainerStyles, this.state.firstCardIndex === index && firstCardContainerStyles, {'zIndex': z[index]})}
              onClick={(e) => flip(e, index)}
            >

              <card className="card">
                <div 
                  className="front face"
                  style={Object.assign({}, this.state.firstCardIndex === index && firstFaceStyles)}>
                  <div className="upper pipArea">
                    <div className="pip">
                      <div className="rank">

                        { getRank(index) }

                      </div>
                      <div className="suit"></div>
                    </div>
                  </div>

                  <div className="content">

                    { card.front }

                  </div>

                  <div className="lower pipArea">
                    <div className="pip">
                      <div className="rank">
                        { getRank(index) }
                      </div>
                      <div className="suit"></div>
                    </div>
                  </div>
                </div>

                <div 
                  className="back face"
                  style={Object.assign({}, this.state.firstCardIndex === index && firstFaceStyles)}
                >

                  { card.back }

                  <div  
                    className="right answer" 
                    ref="right" 
                    onClick={(e) => {
                      this.dropCardAndSetDeck(e, 'left'); 
                      this.tally(1);
                    }}
                  >

                    Right

                  </div>
                  <div 
                    className="wrong answer" 
                    ref="wrong" 
                    onClick={(e) => {
                      this.dropCardAndSetDeck(e, 'right');
                      this.tally(-1);
                    }}
                  >

                    Wrong

                  </div>
                </div>
              </card>
            </div>
          ))
        } 
      </div>
    )
  }
}

function mapStateToProps({ userId, cards, deckInPlay }) {
  // if (!state) return {};
  return { userId, cards, deckInPlay };
}

let outputActions = {
  setCards
  ,setDeckInPlay
}

export default connect(mapStateToProps, outputActions)(Deck);