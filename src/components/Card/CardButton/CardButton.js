import React from 'react';

export default function(props) {
  return (
    <button
      className={props.className}
      style={props.buttonStyle ? props.buttonStyle : null}
      disabled={props.disabled}  
      onClick={props.onClick}>
      { props.children } 
    </button>
  )
}