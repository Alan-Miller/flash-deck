import React, { Component } from 'react';
import { setCards } from '../../redux/reducer';
import { connect } from 'react-redux';
import { getAllCards } from '../../services/cardService';
import { positionCardContainer, flipCard } from '../../utils/cardUtils';

class Quiz extends Component {

  constructor() {
    super()

    this.state = {
      currentCardIndex: 0
      ,reveal: false
    }
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
  }

  componentDidMount() {

    getAllCards(this.props.userId)
    .then(cards => {
      this.props.setCards(cards);
    });
  }

  add() {
    let nextIndex = this.state.currentCardIndex + 1;
    nextIndex = nextIndex > 7 ? -1 : nextIndex;
    if (this.state.reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    else this.setState({reveal: true});
  }

  sub() {
    const nextIndex = this.state.currentCardIndex - 1;
    // if (this.state.reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
    // else this.setState({reveal: true});
    this.setState({currentCardIndex: nextIndex, reveal: true})
  }

  render() {
    const { currentCardIndex } = this.state;
    
    return(
      <section className="Quiz">
        <main>
          <div className="qButton" onClick={this.add}>{this.state.currentCardIndex}</div>
          <div className="qButton2" onClick={this.sub}>{this.props.cards.length}</div>
          <div className="Quiz__table">
            <div className="Quiz__cards-go-here"></div>
            <div className="Quiz__cards-go-here"></div>
            
            <div className="Quiz__deck">
              { this.props.cards && this.props.cards.map((card, i) => (
                <div className="Quiz__card-container" key={i}
                  style={positionCardContainer(i, currentCardIndex, this.props.cards.length)}>
                  
                  <div className="card"
                    style={flipCard(i, currentCardIndex, this.state.reveal)}>
                    <div className="front face">
                      <div className="content">
                        { card.front }
                      </div>
                    </div>

                    <div className="back face">
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