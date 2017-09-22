import React from 'react';

export function Pip(props) {
  return (
      <div className={props.className}>
        <span className="pip">
          <div className="rank">
            { props.rank }
          </div>
          <div className="suit" style={props.style.pipImg}></div>
        </span>
      </div>
  )
}