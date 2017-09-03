import React from 'react';

export default function(props) {
  return (
    <div  
      className={props.className}
      style={props.buttonStyle ? props.buttonStyle : null}
      onClick={props.onClick}>
      { props.children } 
    </div>
  )
}