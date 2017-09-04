import React, { Component } from 'react';
import { setCards, setDeck } from '../../redux/reducer';
import { connect } from 'react-redux';
import { getAllCards } from '../../services/cardService';
import { buildDeck } from '../../utils/deckUtils';
import { styleCardContainer, flipCard, cardFace } from '../../utils/cardUtils';
import Pip from '../Pip/Pip';
import CardButton from '../CardButton/CardButton';
import { getRank, tallyPoints } from '../../utils/playUtils';

class Play extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: -1
      ,reveal: true
      ,score: 0
    }
    this.advance = this.advance.bind(this);
    this.reverse = this.reverse.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.handleKeyDown= this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    
    const playMode = true;
    getAllCards(this.props.userId)
    .then(cards => {
      this.props.setDeck(buildDeck(cards, playMode));
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  advance() {
    const { deck } = this.props;
    const { currentCardIndex, reveal } = this.state;
    let nextIndex = this.state.currentCardIndex + 1;
    
    if (currentCardIndex >= deck.length) return;
    // if (currentCardIndex >= deck.length) this.setState({currentCardIndex: -1, reveal: false});
    if (reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    else this.setState({reveal: true});
  }

  reverse() {
    const { deck } = this.props;
    const { currentCardIndex, reveal } = this.state;
    const nextIndex = this.state.currentCardIndex - 1;

    if (currentCardIndex <= -1) {
      this.setState({currentCardIndex: deck.length});
      console.log(currentCardIndex)
    }
    else {
      if (!reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
      else this.setState({reveal: false});
    }
  }

  handleKeyDown(e) {
    // if (e.which === 37) this.reverse();
    if (e.which === 38 || e.which === 39) {
      this.updateScore(true);
      this.advance();
    }
    if (e.which === 40) {
      this.updateScore(false);
      this.advance();
    }
  }

  updateScore(correct) {
    const { currentCardIndex, score, reveal } = this.state;
    if (currentCardIndex === -1 || !reveal) return;
    
    const points = tallyPoints(currentCardIndex, correct);
    this.setState({points, score: score + points})
  }

  render() {
    const { currentCardIndex, points, score, reveal } = this.state;
    const { deck } = this.props;
    
    return(
      <section className="Play">
        <main>
          # Cards: {deck.length}
          <br/>
          Points: {points}
          <br/>
          Score: {score}
          <div className="table">
            
            <div className="card-space">
              <div className="place-cards-here" onClick={this.reverse}></div>

              <div className="center-of-table">
                <div className="upper bar">
                  <CardButton 
                    className="right-answer button" 
                    disabled={!reveal && 'disabled'}
                    onClick={() => {
                      this.updateScore(true);
                      this.advance();
                    }}>
                    Right
                  </CardButton>
                </div>
                <div className="lower bar">
                  <CardButton 
                    className="wrong-answer button" 
                    disabled={!reveal && 'disabled'}
                    onClick={() => {
                      this.updateScore(false);
                      this.advance();
                    }}>
                    Wrong
                  </CardButton>
                </div>
              </div>
              
              <div className="place-cards-here" onClick={this.advance}></div>
              
             

              { deck && deck.map((card, i) => (
                <div className="card-container" key={i}
                  style={styleCardContainer(i, currentCardIndex, deck.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, reveal)}
                    onClick={
                      i < currentCardIndex ? this.reverse :
                      i >= currentCardIndex ? this.advance :
                      null
                    }>
                    <div className="front face" style={cardFace(i, currentCardIndex, 'front')}>
                      <Pip className="upper pipArea">
                        { getRank(i) }
                      </Pip>
                      <div className="content">
                        { card.front }
                      </div>
                      <Pip className="lower pipArea">
                        { getRank(i) }
                      </Pip>
                    </div>

                    <div className="back face" style={cardFace(i, currentCardIndex, 'back')}>
                      <div className="content">
                        { card.back }
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </main>
      </section>
    )
  }
}

let outputActions = {
  setCards, setDeck
}

function mapStateToProps(state) {
  if (!state) return {};
  return state;
}

export default connect(mapStateToProps, outputActions)(Play);