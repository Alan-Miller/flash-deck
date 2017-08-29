import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCards, setDeckInPlay } from '../redux/reducer';

import { getDisplayName } from '../services/service';
import cardStyles from '../styles/modularStyles/cardStyleObject';

import { tallyPts } from '../utils/playUtils';
import { buildDeck } from '../utils/deckUtils';
import { flip, dropCard, getRank } from '../utils/cardUtils';

import Header from './Header';

class Play extends Component {

  constructor() {
    super()

    this.state = {
      firstCardIndex: 0
      ,face: 'front'
      ,score: 0
      ,points: 0
      ,pointStyle: ''
      ,displayName: ''
    }
    this.handleFileSelect= this.handleFileSelect.bind(this);
    this.handleKeyDown= this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    //~~~~~~~~~~~~~~~~~~~~~~~ EVENT LISTENERS
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('drop', this.handleFileSelect);
    document.addEventListener('keydown', this.handleKeyDown);
    getDisplayName().then(displayName => { this.setState({ displayName }) });

    //~~~~~~~~~~~~~~~~~~~~~~~ SET CARDS AND BUILD DECK
    (() => {
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Check localStorage for any cards. If none, set empty array
        Handle async (set state after cards come down on props)
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      let cards = localStorage.getItem('cards') ? 
      JSON.parse(localStorage.getItem('cards')) 
      : [];
      
      this.props.addCards(cards);
      const promise = new Promise((resolve, reject) => {
        if (this.props.cards) resolve('Cards are now on props');
        else reject(new Error('Something bad happened'));
      });
      promise.then(fulfilled => {this.buildAndSetDeck(this.props.cards);});
    })()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  tally(sign) {
    const rank = getRank(this.state.firstCardIndex);
    const points = tallyPts(sign, rank);
    let score = this.state.score + points;
    let pointStyle = sign === 1 ? 'pointsUp' : 'pointsDown';
    this.setState({points, score, pointStyle});
  }

  handleFileSelect(e) {
    e.preventDefault();

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
      Drop event saves document
      FileReader reads file and puts result on reader.result
      Once FileReader finishes, reader.result is mapped
      newCards array: each item (card) is array with two items (front and back)
      Add newCards to current cards
      Save cards to localStorage
      Put cards on Redux state with action creator
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var file = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = () => {
      let newCards= reader.result.split('\r').map((card, index) => {
        return card.split(/,(.+)/).filter(item => item);
      }) 
      let cards = this.props.cards.concat(newCards);
      localStorage.setItem('cards', JSON.stringify(cards));
      this.props.addCards(cards)
    }
  }

  handleKeyDown(e) {
    const firstIndex = this.state.firstCardIndex;
    const card = document.getElementById(firstIndex)
    if (!card || firstIndex > 51) return;

    this.setState({ pointStyle: '' })

    let { face } = this.state;
    let direction = '';

    if (face === 'front') {
      if ( e.which >= 38 && e.which <= 40 ) { flip(e, firstIndex); }
      this.setState({ face: 'back' })
    }
    if (face === 'back') {
      if (e.which === 37)                   { flip(e, firstIndex); }
      if (e.which === 38 || e.which === 39) { direction = 'left'; this.tally(1); }
      if (e.which === 40)                   { direction = 'right'; this.tally(-1); }
      this.setState({ face: 'front' })
    } 
    direction && this.dropCardAndSetDeck(e, direction);
  }

  buildAndSetDeck(cards) {
    this.setState({firstCardIndex: 0, score: 0})
    const deck = buildDeck(cards);
    this.props.setDeckInPlay(deck);
  }

  dropCardAndSetDeck(e, direction) {
    const { firstCardIndex } = this.state;
    const firstCard = document.getElementById(firstCardIndex);
    dropCard(e, direction, firstCard); // Drop card
    this.setState(Object.assign( {}, {firstCardIndex: firstCardIndex + 1} )) // Set index
    this.props.setDeckInPlay(this.props.deckInPlay.splice(0)); // Set deck
  }

  render() {
    const { cardContainerStyles, firstCardContainerStyles, firstFaceStyles } = cardStyles;
    let z = Array.from(Array(53).keys()).reverse();
    z.pop();


    return (
      <section className="Play" id="dropZone">
        <Header 
          score={this.state.score} 
          points={this.state.points} 
          pointStyle={this.state.pointStyle} 
          displayName={this.state.displayName} 
        />
        <main className="main">
          <div 
            className="button" 
            onClick={() => this.buildAndSetDeck(this.props.cards)}>
            Make random deck
          </div>

          <div className="nav">
            <h2>PLAY COMPONENT</h2>
            <Link to="/"><h4>Home</h4></Link>
          </div>

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

                        { card[0] }

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

                      { card[1] }

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

          <div className="clickBarrier"></div>
        </main> 
      </section>
    )
  }
}

function mapStateToProps(state) {
  if (!state) return {};
  return state;
}

let outputActions = {
  addCards
  ,setDeckInPlay
}

export default connect(mapStateToProps, outputActions)(Play);