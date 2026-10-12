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

// Public API only. Never put a GitHub token in client-side source.
const GITHUB_USER = 'Loca-33';
const EXCLUDED_REPOS = ['loca-33.github.io'];

function selectRepositories(repos) {
  const unique = new Map();
  repos.forEach(repo => {
    if (!repo || typeof repo.name !== 'string' || repo.private ||
        repo.owner?.login?.toLowerCase() !== GITHUB_USER.toLowerCase() ||
        EXCLUDED_REPOS.includes(repo.name.toLowerCase())) return;
    unique.set(repo.name, repo);
  });
  return [...unique.values()].sort((a, b) =>
    (Date.parse(b.updated_at) || 0) - (Date.parse(a.updated_at) || 0) ||
    a.name.localeCompare(b.name));
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function repositoryCard(repo) {
  const card = element('article', 'project repo-card');
  const meta = element('div', 'project-meta');
  meta.append(element('span', '', repo.language || 'Repository'));
  meta.append(element('span', 'status', repo.fork ? 'Fork' : 'Original repository'));
  if (repo.archived) meta.append(element('span', 'status', 'Archived'));
  const date = new Date(repo.updated_at);
  if (!Number.isNaN(date.getTime())) {
    meta.append(element('span', '', 'Updated ' + date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
    })));
  }
  const content = element('div', 'project-content');
  const heading = element('h3');
  const link = element('a', '', repo.name);
  // Construct a trusted GitHub URL; never interpret repository text as HTML.
  link.href = 'https://github.com/' + GITHUB_USER + '/' + encodeURIComponent(repo.name);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  heading.append(link);
  content.append(heading, element('p', '', repo.description || 'No description provided on GitHub.'));
  const tags = element('div', 'tags');
  (Array.isArray(repo.topics) ? repo.topics : []).forEach(topic => {
    if (typeof topic === 'string') tags.append(element('span', '', topic));
  });
  if (tags.childNodes.length) content.append(tags);
  const source = element('a', 'text-link', 'View repository ↗');
  source.href = link.href;
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  content.append(source);
  card.append(meta, content);
  return card;
}

async function loadRepositories() {
  const list = document.getElementById('github-projects');
  const status = document.getElementById('projects-status');
  if (!list || !status) return;
  list.setAttribute('aria-busy', 'true');
  status.textContent = 'Loading public repositories from GitHub…';
  try {
    const all = [];
    // GitHub returns at most 100 repositories per page. Fetch every page.
    for (let page = 1; ; page++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let batch;
      try {
        const response = await fetch('https://api.github.com/users/' + GITHUB_USER +
          '/repos?type=owner&sort=updated&direction=desc&per_page=100&page=' + page, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal, cache: 'no-store', credentials: 'omit'
        });
        if (!response.ok) throw new Error('GitHub HTTP ' + response.status);
        batch = await response.json();
        if (!Array.isArray(batch)) throw new Error('Invalid repository response');
      } finally {
        clearTimeout(timeout);
      }
      all.push(...batch);
      if (batch.length < 100) break;
    }
    const repos = selectRepositories(all);
    list.replaceChildren(...repos.map(repositoryCard));
    status.textContent = repos.length
      ? repos.length + ' public ' + (repos.length === 1 ? 'repository' : 'repositories') +
        ' · Homepage repository excluded · Forks labeled'
      : 'No public project repositories to display yet.';
  } catch (error) {
    // No stale or invented project cards when the API cannot be reached.
    list.replaceChildren();
    status.textContent = 'GitHub repositories are temporarily unavailable. Please use the GitHub link below or reload later.';
  } finally {
    list.setAttribute('aria-busy', 'false');
    updateNavigation();
  }
}

loadRepositories();
