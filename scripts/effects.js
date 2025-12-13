// КОНФЕТТИ
document.addEventListener('click', function(e) {
	createConfetti(e.clientX, e.clientY);
});

function createConfetti(x, y) {
	const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
	const numConfetti = 30;
	for (let i = 0; i < numConfetti; i++) {
		const confetti = document.createElement('div');
		confetti.style.position = 'fixed';
		confetti.style.left = x + 'px';
		confetti.style.top = y + 'px';
		confetti.style.width = '8px';
		confetti.style.height = '8px';
		confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
		confetti.style.borderRadius = '50%';
		confetti.style.pointerEvents = 'none';
		confetti.style.zIndex = 9999;
		confetti.style.opacity = 0.8;
		confetti.style.transition = 'transform 1s cubic-bezier(.62,.01,.27,1.24), opacity 1s';
		document.body.appendChild(confetti);

		const angle = Math.random() * 2 * Math.PI;
		const distance = 80 + Math.random() * 80;
		const dx = Math.cos(angle) * distance;
		const dy = Math.sin(angle) * distance;

		setTimeout(() => {
			confetti.style.transform = `translate(${dx}px, ${dy}px) scale(${0.7 + Math.random() * 0.6})`;
			confetti.style.opacity = 0;
		}, 10);
		setTimeout(() => {
			confetti.remove();
		}, 1100);
	}
}