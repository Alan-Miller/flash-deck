export function dropCard(e, direction, firstCardContainer) {
    e.stopPropagation();

    // Buttons disappear on drop
    const buttons = firstCardContainer.children[0].children[1].children;
    [].forEach.call(buttons, button => button.style.display = 'none');
    // [].forEach.call(e.target.parentNode.children, button => button.style.display = 'none');

    // Drop styles added
    firstCardContainer.classList.add(`drop-${direction}`);
    // const firstCardContainer = e.target.parentNode.parentNode.parentNode;

    // Reset button and card styles after drop animation
    setTimeout(() => {
        firstCardContainer.style.display = 'none';
        firstCardContainer.classList.remove('drop-left', 'drop-right');
    }, 400);
}