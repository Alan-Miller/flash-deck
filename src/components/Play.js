import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

import { addCards, setDeckInPlay } from '../redux/reducer';
import { getDisplayName } from '../services/service';
import { buildDeck } from '../utils/buildDeck';
import { dropCard } from '../utils/dropCard';
import { getRank } from '../utils/getRank';
import { flip } from '../utils/flip';

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
        this.handleFileSelect= this.handleFileSelect.bind(this)
        this.handleKeyDown= this.handleKeyDown.bind(this)
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
        let points;
        if (+rank > 1 || rank < 11) points = +rank * sign;
        if (rank === 'J') { if (sign === 1) points = 1; else points = -25; }
        if (rank === 'Q') { if (sign === 1) points = 40; else points = -1; }
        if (rank === 'K') points = 50 * sign;
        if (rank === 'A') points = [1, 11][Math.floor(Math.random() * 2)] * sign;
        let score = this.state.score + points;
        let pointStyle = sign === 1 ? 'pointsUp' : 'pointsDown';
        this.setState({points, score, pointStyle});
    }

    handleFileSelect(e) {
        e.preventDefault();
        
        // Drop event saves document
        // FileReader reads file and puts result on reader.result
        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        
        // Once FileReader finishes, map reader.result
        reader.onload = () => {
            let newCards= reader.result.split('\r').map((card, index) => {
                return card.split(/,(.+)/).filter(item => item);
            })  
            // newCards array: each item (card) is array with two items (front and back)
            // Add newCards to current cards
            // Save to localStorage   
            // Put cards on Redux state
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
            if ( e.which >= 38 && e.which <= 40 )   { flip(e, firstIndex); }
            this.setState({ face: 'back' })
        }
        if (face === 'back') {
            if (e.which === 37)                     { flip(e, firstIndex); }
            if (e.which === 38 || e.which === 39)   { direction = 'left'; this.tally(1); }
            if (e.which === 40)                     { direction = 'right'; this.tally(-1); }
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

        return (
            <section className="Play" id="dropZone">
                <Header 
                    score={ this.state.score } 
                    points={ this.state.points } 
                    pointStyle={ this.state.pointStyle } 
                    displayName={ this.state.displayName } />
                <main className="main">
                    <div 
                        className="button" 
                        onClick={ () => this.buildAndSetDeck(this.props.cards) }>

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
                                    onClick={(e) => flip(e, index)}>

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

export default connect( mapStateToProps, outputActions )( Play );