// принимаем элементы меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// оверлей меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// открыть-закрыть
function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  // смена состояния
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mainNav.classList.toggle('active');
  navOverlay.classList.toggle('active');
  // Блокировка скролла
  document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// закрытие при нажатии на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// закрытие по эскейпу
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav.classList.contains('active')) {
    toggleMenu();
  }
});

// закрытие при смене лица клиента
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
    toggleMenu();
  }
});

// прокрутка вверх
const scrollTopButton = document.getElementById('scrollTop');

// показ после действия
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
});

// действие прокрутки
scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});