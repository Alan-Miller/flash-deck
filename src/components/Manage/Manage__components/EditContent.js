import React from 'react';

export default function(props) {
  return (
    <div 
      className="edit"
      onClick={props.onClick}>
      EDIT
    </div>

    
  )
}



// <div className="back cardContent">
//   {card.back}
//   <EditContent onClick={_ => {this.setState(
//     {cardMode: 'back', cardID: card.id, oldContent: card.back}
//   )}} />
// </div>