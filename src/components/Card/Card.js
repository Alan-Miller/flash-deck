import React from 'react';
import CardButton from './CardButton/CardButton';
import Pip from './Pip/Pip';

export default function Card(props) {

  const { card, rank, topFunction, bottomFunction, cardStyle } = props;

  return (
    <div className="Card card">

      <div 
        className="front face"
        style={cardStyle}>
        
        <Pip className="upper pipArea">
          { rank }
        </Pip>

        <div className="content">
          { card.front }
        </div>
        
        <Pip className="lower pipArea">
          { rank }
        </Pip>
      </div>



      <div 
        className="back face"
        style={cardStyle}>

        { card.back }

        <CardButton 
          className="right answer" 
          onClick={topFunction}>
          Right
        </CardButton>

        <CardButton 
          className="wrong answer" 
          onClick={bottomFunction}>
          Wrong
        </CardButton>
      </div>

    </div>
  )
}