import React from 'react';

export function FrontFace(props) {
  return (
    <div className="front face" style={props.style}>
      <div className="upper pipArea">
        <span className="pip">
          <div className="rank">
            { props.rank }
          </div>
          <div className="suit" style={props.style.img}></div>
        </span>
      </div>

      <div className="content">
        { props.children }
      </div>

      <div className="lower pipArea">
        <div className="pip">
          <div className="rank">
            { props.rank }
          </div>
          <div className="suit" style={props.style.img}></div>
        </div>
      </div>
    </div>
  )
}

export function BackFace(props) {
  return (
    <div className="back face" style={props.style}>
      <div className="content">
        { props.children }
      </div>
    </div>
  )
}

