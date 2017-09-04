const $redsuit = `#C24444`;
const $blacksuit = `#205050`;


// export function flip(e, id) {
//   e.stopPropagation();
//   const card = document.getElementById(id);
//   card.classList.toggle('flip');
//   card.classList.add('fade-in');
// }

// export function dropCard(e, direction, firstCardContainer) {
//   e.stopPropagation();
//   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
//       Buttons disappear on drop
//       Drop styles added
//       Reset button and card styles after drop animation
//   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//   const buttons = firstCardContainer.children[0].children[1].children;
//   [].forEach.call(buttons, button => button.style.display = 'none');

//   firstCardContainer.classList.add(`drop-${direction}`);

//   setTimeout(() => {
//     firstCardContainer.style.display = 'none';
//     firstCardContainer.classList.remove('drop-left', 'drop-right');
//   }, 700);
// }


// const cardContainers = document.getElementsByClassName('card-container');
// [].forEach.call(cardContainers, (container, index) => {
//   container.classList.remove('fade-in');
// });
// [].forEach.call(document.getElementsByClassName('answer'), container => {
//   container.style.display = 'flex';
// });


export function styleCardContainer(index, currentCardIndex, numCards) {
  // Position and rotation of cards on left
  // let random = Math.ceil(11 / (index + 1));
  let random = index % 13;
  random = index % 3 ? random * -1.2 : random * 3.7; // every third is different
  // let random = Math.ceil(Math.random() * 11); // rotate up to 11 deg
  // random = random % 2 ? random * -1 : random; // odd numbers rotate other way
  const leftStyles = {
    left: `250px`, 
    zIndex: index + 100,
    transform: `translateX(-100%) rotateZ(${random}deg) scale(.75)`,
    transition: `.2s`
  }
  if (index < currentCardIndex) return leftStyles;

  // Position and rotation of current card (middle)
  const currentCardStyles = {
    left: `50%`, 
    zIndex: numCards + 101,
    transform: `translateX(-50%) rotateZ(0deg) scale(1)`,
    transition: `.5s`
  }
  if (index === currentCardIndex) return currentCardStyles;

  // Position and rotation of cards on right
  let rightStyles = {
    left: `auto`,
    zIndex: (numCards - index) + 100,
    right: `0`, 
    transform: `translateX(0) rotateZ(0deg) scale(.75)`,
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
      color: $blacksuit
    };
    else if (index < 26) style = {
      border: `medium solid ${$redsuit}`,
      color: $redsuit
    };
    else if (index < 39) style = {
      border: `medium solid ${$blacksuit}`,
      color: $blacksuit
    };
    else if (index < 52) style = {
      border: `medium solid ${$redsuit}`,
      color: $redsuit
    };
  }

  return Object.assign({}, shadow, style);
}

// export function theSuitStyle(index) {
//   if (index < 13) return {backgroundImage: `url('./imgs/clubs.png')`};
//   if (index < 26) return {backgroundImage: `url('./imgs/diamonds.png')`};
//   if (index < 39) return {backgroundImage: `url('./imgs/spades.png')`};
//   if (index < 52) return {backgroundImage: `url('./imgs/hearts.png')`};
// }
