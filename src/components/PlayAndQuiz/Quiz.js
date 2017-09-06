import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCards } from '../../redux/reducer';
import { getAllCards } from '../../services/cardService';
import { shuffle } from '../../utils/deckUtils';
import { styleCardContainer, flipCard, cardFace } from '../../utils/cardUtils';
import CardButton from '../CardButton/CardButton';
import { Link } from 'react-router-dom';

class Quiz extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: -1
      ,reveal: true
    }
    this.advance = this.advance.bind(this);
    this.reverse = this.reverse.bind(this);
    this.handleKeyDown= this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

    getAllCards(this.props.userId)
    .then(cards => {
      this.props.setCards(shuffle(cards));
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  advance() {
    const { cards } = this.props;
    const { currentCardIndex, reveal } = this.state;
    let nextIndex = this.state.currentCardIndex + 1;
    
    if (currentCardIndex >= cards.length) this.setState({currentCardIndex: -1, reveal: false});
    
    if (reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    else this.setState({reveal: true});
  }

  reverse() {
    const { cards } = this.props;
    const { currentCardIndex, reveal } = this.state;
    const nextIndex = this.state.currentCardIndex - 1;

    if (currentCardIndex <= -1) {
      this.setState({currentCardIndex: cards.length});
      console.log(currentCardIndex)
    }
    else {
      if (!reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
      else this.setState({reveal: false});
    }
  }

  handleKeyDown(e) {
    if (e.which === 37) this.reverse();
    if (e.which === 39) this.advance();
  }

  render() {
    const { currentCardIndex, reveal } = this.state;
    const { cards } = this.props;
    
    return(
      <section className="Quiz">

        <div className="header">
          <ul className="info">
            <li># Cards: {cards.length}</li>
          </ul>
        </div>

        <main className="main">
          <div className="table">
            
            <div className="card-space">
              <div className="place-cards-here" onClick={this.reverse}></div>

              <div className="center-of-table">
                <div className="upper bar">
                  <CardButton 
                    className="right-answer button" 
                    disabled={!reveal && 'disabled'}
                    onClick={() => this.updateScore(true)}>
                    Stop showing
                  </CardButton>
                </div>
                <div className="lower bar">
                  <CardButton 
                    className="wrong-answer button" 
                    disabled={!reveal && 'disabled'}
                    onClick={() => this.updateScore(false)}>
                    Show less
                  </CardButton>
                </div>
              </div>

              <div className="place-cards-here" onClick={this.advance}></div>

              { cards && cards.map((card, i) => (
                <div className="card-container" key={i}
                  style={styleCardContainer(i, currentCardIndex, cards.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, reveal)}
                    onClick={
                      i < currentCardIndex ? this.reverse :
                      i >= currentCardIndex ? this.advance :
                      null
                    }>
                    <div className="front face" style={cardFace(i, currentCardIndex, 'front')}>
                      <div className="content">
                        { card.front }
                      </div>
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

        <div className="footer">
          <ul className="nav">
            <Link to="/"><li>Home</li></Link>
            <Link to="/"><li><span className="altText">Settings</span></li></Link>
          </ul>
        </div>

      </section>
    )
  }
}

let outputActions = {
  setCards
}

function mapStateToProps(state) {
  if (!state) return {};
  return state;
}

export default connect(mapStateToProps, outputActions)(Quiz);