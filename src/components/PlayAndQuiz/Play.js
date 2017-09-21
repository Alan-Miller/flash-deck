import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCards, setDeck } from '../../redux/reducer';
import { getAllCards } from '../../services/cardService';
import { flipCard, buildDeck } from '../../utils/deckUtils';
import { tallyPoints } from '../../utils/playUtils';
import { getRank, positionCard, styleCard } from '../../utils/cardStyleUtils';
import CardButton from '../CardButton/CardButton';
import { FrontFace, BackFace } from '../Face/Face';

class Play extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: -1
      ,reveal: true
      ,points: 0
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
    getAllCards(this.props.userID)
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
    }
    else {
      if (!reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
      else this.setState({reveal: false});
    }
  }

  handleKeyDown(e) {
    // if (e.which === 37) this.reverse();
    if (e.which === 38) {
      this.updateScore(true);
      this.advance();
    }
    if (e.which === 40) {
      this.updateScore(false);
      this.advance();
    }
    if (e.which === 39) { this.setState({reveal: !this.state.reveal})}
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

        <div className="header">
          <ul className="info">
            {deck && <li># Cards in deck: {deck.length}</li>}
            <li>Points: {points}</li>
            <li>Score: {score}</li>
          </ul>
        </div>

        <main className="main">
          
          <div className="table">
            
            <div className="card-space">
              
              { deck && deck.map((card, i) => (
                <div className="card-container" key={i}
                  style={positionCard(i, currentCardIndex, deck.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, reveal)}
                    onClick={
                      i < currentCardIndex ? this.reverse :
                      i > currentCardIndex ? this.advance :
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

              <div className="place-cards-here" onClick={this.reverse}></div>

              <div className="center-of-table">
                <div className="upper bar">
                  <CardButton 
                    className="right-answer button" 
                    // disabled={!reveal && 'disabled'}
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
                    // disabled={!reveal && 'disabled'}
                    onClick={() => {
                      this.updateScore(false);
                      this.advance();
                    }}>
                    Wrong
                  </CardButton>
                </div>
              </div>

              <div className="place-cards-here" onClick={this.advance}></div>
              
            </div>
          </div>
        </main>

        <div className="footer">
          <ul className="nav">
            <Link to="/"><li>Home</li></Link>
            <Link to="/settings"><li><span className="altText">Settings</span></li></Link>
          </ul>
        </div>

      </section>
    )
  }
}

let outputActions = {
  setCards, setDeck
}

function mapStateToProps({ userID, deck }) {
  return { userID, deck };
  // if (!state) return {};
  // return state;
}

export default connect(mapStateToProps, outputActions)(Play);