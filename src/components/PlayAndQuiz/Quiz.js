import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCards } from '../../services/cardService';
import { setAppState, SET_cards } from '../../redux/appReducer';
import { shuffle } from '../../utils/deckUtils';
import CardTable from '../CardTable/CardTable';

class Quiz extends Component {

  constructor() {
    super()
    this.state = {
      currentCardIndex: -1
      ,reveal: true
    }
    this.advance = this.advance.bind(this);
    this.handleKeyDown= this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

    getAllCards(this.props.appState.userID)
    .then(cards => {
      this.props.setAppState(SET_cards, shuffle(cards));
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  advance(amt) {
    const { cards } = this.props.appState;
    const { currentCardIndex, reveal } = this.state;
    let nextIndex = this.state.currentCardIndex + amt;
    
    if (amt === 1) {
      if (currentCardIndex >= cards.length) this.setState({currentCardIndex: -1, reveal: false});
      if (reveal) this.setState({currentCardIndex: nextIndex, reveal: false});
      else this.setState({reveal: true});
    }
    else if (amt === -1) {
      if (currentCardIndex <= -1) this.setState({currentCardIndex: cards.length});
      else {
        if (!reveal) this.setState({currentCardIndex: nextIndex, reveal: true});
        else this.setState({reveal: false});
      }
    }
    else if (!amt) this.setState({reveal: !reveal});
  }

  handleKeyDown(e) {
    if (e.which === 37) this.advance(-1);
    if (e.which === 39) this.advance(1);
  }

  render() {
    const deck = this.props.appState.cards;
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
            passedProps={ 
              { 
                deck 
                ,reveal 
                ,currentCardIndex 
                ,playMode: false 
                ,advance: this.advance 
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

function mapStateToProps({ appState }) {
  return {
    appState: {
      userID: appState.userID,
      cards: appState.cards
    }
  }
}
const mapDispatchToProps = { setAppState }

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);