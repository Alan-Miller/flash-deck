import React from 'react';

export default function(props) {
  return (
    <div  
      className={props.className}
      onClick={(e) => {
        props.dropCardAndSetDeck(e, 'left'); 
        props.tally(1);
      }}
    >
      {props.children}
    </div>
  )
}