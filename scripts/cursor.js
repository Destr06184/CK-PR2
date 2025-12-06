// Кастомный курсор: бумажный самолётик с шлейфом
(function () {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const plane = document.createElement('div');
  plane.id = 'cursor-plane';
  document.body.appendChild(plane);

  document.body.classList.add('has-custom-cursor');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let lastX = targetX;
  let lastY = targetY;
  let rafId;

  const lerp = (a, b, t) => a + (b - a) * t;

  function spawnTrail(x, y) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.transform = `translate(${x}px, ${y}px)`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 500);
  }

  function update() {
    currentX = lerp(currentX, targetX, 0.2);
    currentY = lerp(currentY, targetY, 0.2);

    const dx = currentX - lastX;
    const dy = currentY - lastY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // нос вперёд по движению

    plane.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg)`;

    // шлейф — создаём точку, если движение заметное
    const dist2 = dx*dx + dy*dy;
    if (dist2 > 16) {
      spawnTrail(currentX, currentY);
      lastX = currentX;
      lastY = currentY;
    }

    rafId = requestAnimationFrame(update);
  }

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    plane.parentElement?.classList.add('cursor-visible');
  }

  function onLeave() {
    plane.parentElement?.classList.remove('cursor-visible');
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerleave', onLeave, { passive: true });

  rafId = requestAnimationFrame(update);

  // Очистка при выгрузке
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();