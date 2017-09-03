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


export function positionCard(index, currentCardIndex) {
  // let random = Math.ceil(Math.random() * 11); // rotate up to 11 deg
  // random = random % 2 ? random * -1 : random; // odd numbers become negative
  const leftStyles = {
    left: `0`, 
    // right: `auto`, 
    transform: `translateX(0) rotate(0deg) scale(.88)`};
  if (index < currentCardIndex) return leftStyles;

  const currentCardStyles = {
    left: `50%`, 
    // right: `auto`, 
    transform: `translateX(-50%) rotate(0deg) scale(1)`
  }
  if (index === currentCardIndex) return currentCardStyles;

  let rightStyles = {
    left: `80%`,
    // right: `0`, 
    transform: `translateX(0) rotate(0deg) scale(.88)`
  };
  // if (index > currentCardIndex && index <= currentCardIndex + 5) {
  //   Object.assign(rightStyles, {
  //     right: `-${index - currentCardIndex}px`, 
  //     left: `auto`,
  //     top: `${index - currentCardIndex}px`
  //   });
  // }
  if (index > currentCardIndex) return rightStyles;
  
  
  
  
}

// @include position(absolute, $right: 0%, $top: 50%, $x: 0%, $y: -50%);
// Object.assign({}, leftCardStyles, {transform: `translate() rotate(${rotateRandom()}deg)`})

// const leftCardStyles = {
//   position: `absolute`
//   ,left: `0`
//   ,top: `50%`
// }
