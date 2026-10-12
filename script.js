'use strict';
// Static content and GitHub fallback links work without JavaScript.
const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();
const links = [...document.querySelectorAll('nav a')];
const sections = links.map(link => {
  const href = link.getAttribute('href');
  return href && href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
}).filter(Boolean);
let scheduled = false;
function updateNavigation() {
  const position = window.scrollY + 180;
  let active = null;
  sections.forEach(section => { if (section.offsetTop <= position) active = section.id; });
  links.forEach(link => {
    if (link.getAttribute('href') === '#' + active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

