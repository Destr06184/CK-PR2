// Конфетти эффект
function createConfetti(element) {
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti-container');
  element.appendChild(confettiContainer);

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = 0;
    }, 100);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 2000);
}

// Привязка эффекта к элементам
const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => createConfetti(button));
});