import React from 'react';

export default function PipArea(props) {
  return (
    <div className={props.className}>
      <div className="pip">
        <div className="rank">
          { props.children }
        </div>
        <div className="suit"></div>
      </div>
    </div>
  )
}