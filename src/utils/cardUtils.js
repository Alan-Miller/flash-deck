export function flip(e, id) {
  e.stopPropagation();
  const card = document.getElementById(id);
  card.classList.toggle('flip');
  card.classList.add('fade-in');
}

export function dropCard(e, direction, firstCardContainer) {
  e.stopPropagation();
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
      Buttons disappear on drop
      Drop styles added
      Reset button and card styles after drop animation
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const buttons = firstCardContainer.children[0].children[1].children;
  [].forEach.call(buttons, button => button.style.display = 'none');

  firstCardContainer.classList.add(`drop-${direction}`);

  setTimeout(() => {
    firstCardContainer.style.display = 'none';
    firstCardContainer.classList.remove('drop-left', 'drop-right');
  }, 700);
}

export function moveCard(e, direction, firstCardContainer) {
  console.log(direction, firstCardContainer);
  e.stopPropagation();
  const buttons = firstCardContainer.children[0].children[1].children;

  if (direction === 'right') {
    [].forEach.call(buttons, button => button.style.display = 'flex');
    firstCardContainer.classList.remove(`move-left`);
  }
  else if (direction === 'left') {
    [].forEach.call(buttons, button => button.style.display = 'none');
    firstCardContainer.classList.add(`move-left`);
  }
}

// const cardContainers = document.getElementsByClassName('card-container');
// [].forEach.call(cardContainers, (container, index) => {
//   container.classList.remove('fade-in');
// });
// [].forEach.call(document.getElementsByClassName('answer'), container => {
//   container.style.display = 'flex';
// });


export function positionCardContainer(index, currentCardIndex, numCards) {
  // Position and rotation of cards on left
  let random = Math.ceil(11 / (index + 1));
  // let random = Math.ceil(Math.random() * 11); // rotate up to 11 deg
  random = random % 2 ? random * -1 : random; // odd numbers rotate other way
  const leftStyles = {
    left: `250px`, 
    zIndex: index,
    transform: `translateX(-100%) rotateZ(${random}deg) scale(.88)`,
    transition: `.2s`
  }
  if (index < currentCardIndex) return leftStyles;

  // Position and rotation of current card (middle)
  const currentCardStyles = {
    left: `50%`, 
    zIndex: numCards + 1,
    transform: `translateX(-50%) rotateZ(0deg) scale(1)`,
    transition: `.5s`
  }
  if (index === currentCardIndex) return currentCardStyles;

  // Position and rotation of cards on right
  // let z = Array.from(Array(53).keys()).reverse(); z.pop();
  let rightStyles = {
    left: `auto`,
    zIndex: numCards - index,
    right: `0`, 
    transform: `translateX(0) rotateZ(0deg) scale(.88)`,
    transition: `.5s`
  };
  if (index > currentCardIndex && index <= currentCardIndex + 5) {
    Object.assign(rightStyles, {
      right: `-${index - currentCardIndex}px`, 
      top: `${index - currentCardIndex}px`
    });
  }
  if (index > currentCardIndex) return rightStyles;
}


export function flipCard(index, currentCardIndex, reveal) {
  // if (index < currentCardIndex) return {transform: `rotateY(180deg)`};
  // if (index === currentCardIndex) return {transform: `rotateY(180deg)`};
  // if (index > currentCardIndex) return {transform: `rotateY(360deg)`};
  if (index < currentCardIndex || (index === currentCardIndex && reveal)) {
    return {transform: `rotateY(180deg)`};
  }
  else return {transform: `rotateY(360deg)`};
}