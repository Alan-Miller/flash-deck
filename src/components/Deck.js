import React from 'react'

export default function Deck(props) {
  return (
    <div id="deck">
      { 
        !props.deckInPlay ? null : props.deckInPlay.map((card, index) => (
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

                  { card.front }

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

                { card.back }

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
  )
}