import React from 'react';

export default function Header(props) {
    return (
        <section className="Header">
            <div className="scorecard">
                <span>Score:</span>
                <span className="score">{ props.score }</span>
                <span className={ 'points ' + props.pointStyle }>{ props.points }</span>
            </div>
        </section>
    )
}