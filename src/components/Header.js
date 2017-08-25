import React from 'react';

export default function Header(props) {
    return (
        <section className="Header">
            <div className="scorecard">
                { props.handle && <span>{ `${props.handle}'s` }</span> }
                <span>Honor</span>
                <span className="score">{ props.score }</span>
                <span className={ 'points ' + props.pointStyle }>{ props.points }</span>
            </div>

            <div className="imgBanner">Image banner here</div>
        </section>
    )
}