import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setCards } from '../../redux/reducer';
import { getAllCards } from '../../services/cardService';
import { shuffle } from '../../utils/deckUtils';
import CardTable from './CardTable';
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

    getAllCards(this.props.userID)
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
    const deck = this.props.cards;
    const { currentCardIndex, reveal } = this.state;
    
    return(
      <section className="Quiz">

        <div className="header">
          <ul className="info">
            <li># Cards: {deck.length}</li>
          </ul>
        </div>

        <main className="main">
          <CardTable 
            passedProps={ { 
                            deck 
                            ,reveal 
                            ,currentCardIndex 
                            ,playMode: false 
                            ,advance: this.advance 
                            ,reverse: this.reverse
                            ,buttonText: ['', '']
                          }
            } />
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
  setCards
}

function mapStateToProps({ cards, userID }) {
  return { cards, userID };
}

export default connect(mapStateToProps, outputActions)(Quiz);