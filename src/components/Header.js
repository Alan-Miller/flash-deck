import React from 'react';

export default function Header(props) {
  return (
    <section className="Header">
      <div className="scorecard">
        {props.displayName && <div>{`${props.displayName}'s`}</div>}
        <div>Honor</div>
        <div className="score">{props.score}</div>
        <div className={'points ' + props.pointStyle}>{props.points}</div>
      </div>
    </section>
  )
}