import clubs from '../imgs/clubs.png';
import diamonds from '../imgs/diamonds.png';
import spades from '../imgs/spades.png';
import hearts from '../imgs/hearts.png';
const $redsuit = `#C24444`;
const $blacksuit = `#205050`;

export function styleCardContainer(index, currentCardIndex, numCards) {
  // Position and rotation of cards on left
  let random = index % 13;
  random = index % 3 ? random * -1.2 : random * 3.7; // every third is different
  const leftStyles = {
    left: `250px`, 
    zIndex: index + 100,
    transform: `translate(-100%, ${random/2}px) rotateZ(${random}deg) scale(.75)`,
    transition: `.2s`
  }
  if (index < currentCardIndex) return leftStyles;

  // Position and rotation of current card (middle)
  const currentCardStyles = {
    left: `50%`, 
    zIndex: numCards + 101,
    transform: `translate(-50%, 0) rotateZ(0deg) scale(1)`,
    transition: `.5s`
  }
  if (index === currentCardIndex) return currentCardStyles;

  // Position and rotation of cards on right
  let rightStyles = {
    left: `auto`,
    zIndex: (numCards - index) + 100,
    right: `0`, 
    transform: `translate(0, 0) rotateZ(0deg) scale(.75)`,
    transition: `.5s`
  };
  // Shift cards to look like a stack, but only show 4 at a time
  if (index > currentCardIndex) Object.assign(rightStyles, {
    top: `${(index - 1 - currentCardIndex) * 4}px`
  });
  if (index > currentCardIndex + 4) Object.assign(rightStyles, {display: 'none'})
  return rightStyles;
}




export function flipCard(index, currentCardIndex, reveal) {
  if (index < currentCardIndex || (index === currentCardIndex && reveal)) {
    return {transform: `rotateY(180deg)`};
  }
  else return {transform: `rotateY(360deg)`};
}





export function cardFace(index, currentCardIndex, face) {
  let shadow, style;
  if (index === currentCardIndex) shadow = {boxShadow: `17px 17px 17px 0px rgba(22, 22, 22, .7)`}
  else shadow = {boxShadow: `4px 4px 4px 0px rgba(22, 22, 22, .4)`}

  if (face === 'back') {
    if (index < 13) style = {backgroundColor: $blacksuit};
    else if (index < 26) style = {backgroundColor: $redsuit};
    else if (index < 39) style = {backgroundColor: $blacksuit};
    else style = {backgroundColor: $redsuit};
  }

  if (face === 'front') {
    if (index < 13) style = {
      border: `medium solid ${$blacksuit}`,
      color: $blacksuit,
      img: { backgroundImage: `url('${clubs}')`}
    };
    else if (index < 26) style = {
      border: `medium solid ${$redsuit}`,
      color: $redsuit,
      img: { backgroundImage: `url('${diamonds}')`}
    };
    else if (index < 39) style = {
      border: `medium solid ${$blacksuit}`,
      color: $blacksuit,
      img: { backgroundImage: `url('${spades}')`}
    };
    else if (index < 52) style = {
      border: `medium solid ${$redsuit}`,
      color: $redsuit,
      img: { backgroundImage: `url('${hearts}')`}
    };
  }
  
  return Object.assign({}, shadow, style);
}
