import React from 'react';

export default function(props) {
  return (
    <div  
      className={props.className}
      onClick={props.onClick}>
      { props.children } 
    </div>
  )
}