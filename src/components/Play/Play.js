import React, { Component } from 'react';
import { setCards, setDeck } from '../../redux/reducer';
import { connect } from 'react-redux';
import { getAllCards } from '../../services/cardService';
import { buildDeck } from '../../utils/deckUtils';
import { styleCardContainer, flipCard, cardFace } from '../../utils/cardUtils';
import Pip from '../Card/Pip/Pip';
import CardButton from '../Card/CardButton/CardButton';
import { getRank, tallyPoints } from '../../utils/playUtils';

// import clubs from '../../imgs/clubs.png';

class Play extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: -1
      ,reveal: false
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
    const { currentCardIndex } = this.state;
    let nextIndex = this.state.currentCardIndex + 1;
    
    if (currentCardIndex >= deck.length) this.setState({currentCardIndex: -1, reveal: false});
    
    if (this.state.reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    else this.setState({reveal: true});
  }

  reverse() {
    const { deck } = this.props;
    const { currentCardIndex } = this.state;
    const nextIndex = this.state.currentCardIndex - 1;

    if (currentCardIndex <= -1) {
      this.setState({currentCardIndex: deck.length});
      console.log(currentCardIndex)
    }
    else {
      if (!this.state.reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
      else this.setState({reveal: false});
    }
  }

  handleKeyDown(e) {
    if (e.which === 37) this.reverse();
    if (e.which === 39) this.advance();
  }

  updateScore(correct) {
    const points = tallyPoints(this.state.currentCardIndex, correct);
    this.setState({points});
    this.setState({score: this.state.score + points})
  }

  // theSuitStyle(index) {
  //   if (index < 13) return {backgroundImage: `url('../../imgs/clubs.png')`};
  //   if (index < 26) return {backgroundImage: `url('../../imgs/diamonds.png')`};
  //   if (index < 39) return {backgroundImage: `url('../../imgs/spades.png')`};
  //   if (index < 52) return {backgroundImage: `url('../../imgs/hearts.png')`};
  // }

  render() {
    const { currentCardIndex, points, score } = this.state;
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
            
            <div className="deck">
              <div className="cards-go-here" onClick={this.reverse}></div>
              <div className="cards-go-here" onClick={this.advance}></div>
              
              <div className="buttons">
                <CardButton className="right button" 
                  buttonStyle={currentCardIndex !== -1 && {opacity: '1'}}
                  onClick={() => this.updateScore(true)}>
                  Right
                </CardButton>
                <CardButton className="wrong button" 
                  buttonStyle={currentCardIndex !== -1 && {opacity: '1'}}
                  onClick={() => this.updateScore(false)}>
                  Wrong
                </CardButton>
              </div>

              { deck && deck.map((card, i) => (
                <div className="card-container" key={i}
                  style={styleCardContainer(i, currentCardIndex, deck.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, this.state.reveal)}
                    onClick={
                      i < currentCardIndex ? this.reverse :
                      i > currentCardIndex ? this.advance :
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