import React, { Component } from 'react';
import { setCards } from '../../redux/reducer';
import { connect } from 'react-redux';
import { getAllCards } from '../../services/cardService';
import { shuffle } from '../../utils/deckUtils';
import { styleCardContainer, flipCard, cardFace } from '../../utils/cardUtils';

class Quiz extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: -1
      ,reveal: false
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
    const { currentCardIndex } = this.state;
    let nextIndex = this.state.currentCardIndex + 1;
    
    if (currentCardIndex >= cards.length) this.setState({currentCardIndex: -1, reveal: false});
    
    if (this.state.reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    else this.setState({reveal: true});
  }

  reverse() {
    const { cards } = this.props;
    const { currentCardIndex } = this.state;
    const nextIndex = this.state.currentCardIndex - 1;

    if (currentCardIndex <= -1) {
      this.setState({currentCardIndex: cards.length});
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

  render() {
    const { currentCardIndex } = this.state;
    const { cards } = this.props;
    
    return(
      <section className="Quiz">
        <main>
          <div className="table">
            
            <div className="deck">
              <div className="cards-go-here" onClick={this.reverse}></div>
              <div className="cards-go-here" onClick={this.advance}></div>

              { cards && cards.map((card, i) => (
                <div className="card-container" key={i}
                  style={styleCardContainer(i, currentCardIndex, cards.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, this.state.reveal)}
                    onClick={
                      i < currentCardIndex ? this.reverse :
                      i > currentCardIndex ? this.advance :
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