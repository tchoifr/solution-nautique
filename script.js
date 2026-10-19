// Adresse qui reçoit les demandes du formulaire de contact.
const CONTACT_EMAIL = 'contact@votre-domaine.fr';

// En-tête : ombre au défilement
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  burger.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Galerie du site vitrine
const galleryImg = document.getElementById('gallery-img');
const galleryUrl = document.getElementById('gallery-url');
const thumbs = document.querySelectorAll('.thumb');
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    if (thumb.classList.contains('is-active')) return;
    thumbs.forEach((t) => { t.classList.toggle('is-active', t === thumb); t.setAttribute('aria-selected', String(t === thumb)); });
    galleryImg.classList.add('is-fading');
    const next = new Image();
    next.src = thumb.dataset.src;
    next.decode().catch(() => {}).then(() => {
      galleryImg.src = thumb.dataset.src;
      galleryImg.alt = thumb.dataset.alt;
      galleryUrl.textContent = thumb.dataset.url;
      galleryImg.classList.remove('is-fading');
    });
  });
});

// Onglets du dashboard (flèches du clavier comprises)
const tabs = [...document.querySelectorAll('.tab')];
const selectTab = (tab, focus) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    panel.hidden = !on;
    panel.classList.toggle('is-active', on);
  });
  if (focus) tab.focus();
  tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
};
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab, false));
  tab.addEventListener('keydown', (e) => {
    const vertical = getComputedStyle(tab.parentElement).flexDirection === 'column';
    const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
    const next = vertical ? 'ArrowDown' : 'ArrowRight';
    let j = null;
    if (e.key === next) j = (i + 1) % tabs.length;
    if (e.key === prev) j = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') j = 0;
    if (e.key === 'End') j = tabs.length - 1;
    if (j !== null) { e.preventDefault(); selectTab(tabs[j], true); }
  });
});

// Agrandissement des captures
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target.closest('.lightbox__close')) lightbox.close(); });

// Apparition au défilement
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

// Formulaire de contact : ouvre la messagerie avec la demande pré-remplie
const form = document.getElementById('contact-form');
const formError = document.getElementById('form-error');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = ['nom', 'entreprise', 'telephone', 'email'];
  let ok = true;
  required.forEach((name) => {
    const field = form.elements[name];
    const valid = field.value.trim() !== '' && field.checkValidity();
    field.setAttribute('aria-invalid', String(!valid));
    if (!valid) ok = false;
  });
  formError.hidden = ok;
  if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }

  const v = (name) => form.elements[name].value.trim();
  const subject = `Demande Solution Nautique – ${v('entreprise')}`;
  const body = [
    `Nom : ${v('nom')}`,
    `Entreprise : ${v('entreprise')}`,
    `Flotte : ${v('activite')}`,
    `Port ou ville : ${v('ville') || '-'}`,
    `Téléphone : ${v('telephone')}`,
    `E-mail : ${v('email')}`,
    '',
    v('message'),
  ].join('\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false'); });

document.getElementById('year').textContent = new Date().getFullYear();
