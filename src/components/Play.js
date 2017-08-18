import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCards, setDeckInPlay } from '../redux/reducer';

import { buildDeck} from '../utils/buildDeck';
import { dropCard} from '../utils/dropCard';
import { flip } from '../utils/flip';

class Play extends Component {

    constructor() {
        super()

        this.state = {
            // cards: []
            // ,collections: {
            //     'All': []
            // }
            // deckInPlay: []
            // ,decks: {}
            firstCardIndex: 0
        }
        this.handleFileSelect= this.handleFileSelect.bind(this)
        this.handleKeyDown= this.handleKeyDown.bind(this)
    }

    componentDidMount() {

        //~~~~~~~~~~~~~~~~~~~~~~~ EVENT LISTENERS
        const dropZone = document.getElementById('dropZone');
        dropZone.addEventListener('dragover', this.handleDragOver);
        dropZone.addEventListener('drop', this.handleFileSelect);
        
        document.addEventListener('keyup', this.handleKeyDown);


        //~~~~~~~~~~~~~~~~~~~~~~~ SET CARDS AND BUILD DECK
        (() => {
            // Check localStorage for any cards. If none, set empty array
            let cards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
            this.props.addCards(cards);

            // Handle async (can't set state till cards come down on props)
            const promise = new Promise((resolve, reject) => {
                if (this.props.cards) resolve('Cards are now on props');
                else reject(new Error('Something bad happened'));
            });
            // Set state when cards are ready
            promise.then(fulfilled => {this.buildAndSetDeck(this.props.cards);});
            // NOTE: Previously used setTimeout below to handle async (100 millisecond)
        })()
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleFileSelect(e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0]; // Drop event saves document
        var reader = new FileReader(); // Make new reader object with FileReader methods
        reader.readAsText(file); // FileReader reads file and places result on reader.result

        reader.onload = () => { // Give FileReader time to finish, then map result
            let newCards= reader.result.split('\r').map((card, index) => {
                // Turn each card string into array having a front and back
                return card.split(/,(.+)/).filter(item => item);
            })

            let cards = this.props.cards.concat(newCards); // Add newCards to current cards
            localStorage.setItem('cards', JSON.stringify(cards)); // Save to localStorage

            this.props.addCards(cards)
        }
    }
    handleKeyDown(e) {
        const firstIndex = this.state.firstCardIndex;
        const card = document.getElementById(firstIndex)
        if (!card || firstIndex > 51) return;
        
        card.classList.contains('flip') && e.which === 37 && flip(e, firstIndex);
        (!card.classList.contains('flip')) && e.which === 39 && flip(e, firstIndex);
        // card.classList.contains('flip') && e.which === 39 && flip(e, firstIndex);

        let direction = '';
        if (card.classList.contains('flip') && e.which === 38) direction = 'left';
        if (card.classList.contains('flip') && e.which === 40) direction = 'right';
        direction && this.dropCardAndSetDeck(e, direction);
    }

    buildAndSetDeck(cards) {
        this.setState({firstCardIndex: 0})
        const deck = buildDeck(cards);
        this.props.setDeckInPlay(deck);
    }

    dropCardAndSetDeck(e, direction) {
        const firstCard = document.getElementById(this.state.firstCardIndex);
        // Drop card
        dropCard(e, direction, firstCard);
        // Set index and deck 
        this.setState(Object.assign({}, {firstCardIndex: this.state.firstCardIndex + 1}))
        this.props.setDeckInPlay(this.props.deckInPlay.splice(0));
    }

    render() {
        let z = Array.from(Array(53).keys()).reverse();
        z.pop();

        const cardContainerStyles = {
            marginRight: '-230px'
            ,display: 'flex'
            ,wordWrap: 'break-word'
        }
        const firstCardContainerStyles = {
            marginRight: '50px'
            ,transform: 'scale(1)'
        }
        const firstFaceStyles = {
            boxShadow: '32px 32px 22px 0px rgba(22, 22, 22, .3)'
            ,borderRadius: '18px'
        }
        const showRank = index => {
            index = index % 13;
            return ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'][index];
        }

        return (
            <main className="Play" id="dropZone">
                <div 
                    className="button" 
                    onClick={() => this.buildAndSetDeck(this.props.cards)}>

                    Make random deck
                </div>
                
                <div className="nav">
                    <h2>PLAY COMPONENT</h2>
                    <Link to="/"><h4>Home</h4></Link>
                </div>

                <deck id="deck">
                    { 
                        !this.props.deckInPlay ? null : this.props.deckInPlay.map((card, index) => (
                            <div    
                                className="card-container" 
                                id={index}
                                key={index}
                                style={Object.assign({}, cardContainerStyles, this.state.firstCardIndex === index && firstCardContainerStyles, {'zIndex': z[index]})}
                                onClick={(e) => flip(e, index)}>

                                <card className="card">
                                    <div 
                                        className="front face"
                                        style={Object.assign({}, this.state.firstCardIndex === index && firstFaceStyles)}>
                                        <pip className="topLeft pip">
                                            <div>
                                                <rank>{ showRank(index) }</rank>
                                                <suit></suit>
                                            </div>
                                        </pip>

                                        <div className="content">
                                          
                                            { card[0] }

                                        </div>

                                        <pip className="bottomRight pip">
                                            <div>
                                                <rank>{ showRank(index) }</rank>
                                                <suit></suit>
                                            </div>
                                        </pip>
                                    </div>
                                    
                                    <div className="back face"
                                        style={Object.assign({}, this.state.firstCardIndex === index && firstFaceStyles)}>
                                        
                                        { card[1] }

                                        <div    
                                            className="right answer" 
                                            ref="right" 
                                            onClick={(e) => this.dropCardAndSetDeck(e, 'left')}>
                                            Right
                                        </div>
                                        <div 
                                            className="wrong answer" 
                                            ref="wrong" 
                                            onClick={(e) => this.dropCardAndSetDeck(e, 'right')}>

                                            Wrong
                                        </div>
                                    </div>
                                </card>
                            </div>
                        ))
                    }  
                </deck>

                <barrier className="barrier"></barrier>
            </main> 
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

export default connect( mapStateToProps, outputActions )( Play );