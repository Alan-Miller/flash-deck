import React from 'react';

export default function(props) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}  
      onClick={props.onClick}>
      { props.children } 
    </button>
  )
}