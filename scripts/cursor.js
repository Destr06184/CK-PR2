// МОЙ ЛИЧНЫЙ КУРСОР
(function () {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const circle = document.createElement('div');
  circle.id = 'cursor-circle';
  document.body.appendChild(circle);

  document.body.classList.add('has-custom-cursor');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId;

  const lerp = (a, b, t) => a + (b - a) * t;

  function update() {
    currentX = lerp(currentX, targetX, 0.2);
    currentY = lerp(currentY, targetY, 0.2);

    circle.style.transform = `translate(${currentX}px, ${currentY}px)`;

    rafId = requestAnimationFrame(update);
  }

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    circle.parentElement?.classList.add('cursor-visible');
  }

  function onLeave() {
    circle.parentElement?.classList.remove('cursor-visible');
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerleave', onLeave, { passive: true });

  rafId = requestAnimationFrame(update);

  // очистка при выгрузке
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();