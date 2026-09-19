const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

function closeMenu() {
  menuButton.classList.remove('open');
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogTitle = dialog.querySelector('p');

document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    dialogImage.src = project.dataset.image;
    dialogImage.alt = project.querySelector('img').alt;
    dialogTitle.textContent = project.dataset.title;
    dialog.showModal();
  });
});

dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const form = document.querySelector('.enquiry-form');
const formStatus = document.querySelector('.form-status');

form.addEventListener('submit', event => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll('[required]')];
  requiredFields.forEach(field => field.classList.toggle('invalid', !field.value.trim()));
  const firstInvalid = requiredFields.find(field => !field.value.trim());

  if (firstInvalid) {
    formStatus.textContent = 'Please complete all fields so we can contact you.';
    formStatus.style.color = '#a63e34';
    firstInvalid.focus();
    return;
  }

  const firstName = form.elements.name.value.trim().split(' ')[0];
  formStatus.textContent = `Thank you, ${firstName}. Please call +91 98223 01090 or email rupali.pawankar13@gmail.com to confirm your consultation.`;
  formStatus.style.color = '#416447';
  form.reset();
});

form.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
});

document.getElementById('year').textContent = new Date().getFullYear();
