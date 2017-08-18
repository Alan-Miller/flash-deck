export function flip(e, id) {
    e.stopPropagation();
    // const card = e.currentTarget;
    const card = document.getElementById(id);
    card.classList.toggle('flip');
    card.classList.add('fade-in');
}