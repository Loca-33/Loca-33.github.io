import html, json, os, shutil
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
USER = 'Loca-33'

def fetch_repositories():
    headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'homepage-builder'}
    if os.environ.get('GH_TOKEN'):
        headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
    repos, page = [], 1
    while True:
        url = f'https://api.github.com/users/{USER}/repos?type=owner&sort=updated&direction=desc&per_page=100&page={page}'
        with urlopen(Request(url, headers=headers), timeout=30) as response:
            batch = json.load(response)
        if not isinstance(batch, list):
            raise ValueError('Unexpected API response')
        repos.extend(batch)
        if len(batch) < 100:
            return repos
        page += 1

def render(repos):
    selected = {r['name']: r for r in repos if not r.get('private') and r.get('owner', {}).get('login', '').lower() == USER.lower() and r['name'].lower() != 'loca-33.github.io'}
    rows = sorted(selected.values(), key=lambda r: r.get('updated_at') or '', reverse=True)
    esc = lambda s: html.escape(str(s), quote=True)
    result = []
    for r in rows:
        url = 'https://github.com/' + USER + '/' + quote(r['name'], safe='')
        kind = 'Fork' if r.get('fork') else 'Original repository'
        archive = '<span class="status">Archived</span>' if r.get('archived') else ''
        topics = ''.join('<span>' + esc(t) + '</span>' for t in (r.get('topics') or []))
        result.append(f'''<article class="project repo-card">
<div class="project-meta"><span>{esc(r.get('language') or 'Repository')}</span><span class="status">{kind}</span>{archive}<span>Updated {esc((r.get('updated_at') or '')[:10])}</span></div>
<div class="project-content"><h3><a href="{url}" target="_blank" rel="noopener noreferrer">{esc(r['name'])}</a></h3><p>{esc(r.get('description') or 'No description provided on GitHub.')}</p><div class="tags">{topics}</div><a class="text-link" href="{url}" target="_blank" rel="noopener noreferrer">View repository ↗</a></div></article>''')
    stamp = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    status = f'{len(rows)} public repositories' if rows else 'No public project repositories to display yet.'
    return f'<p class="projects-status">{status} · Last synced {stamp}</p>' + ''.join(result)

def build():
    # Fetch failure stops deployment and preserves the previous published site.
    cards = render(fetch_repositories())
    text = (ROOT/'index.html').read_text(encoding='utf-8')
    start, end = '<!-- REPOSITORIES:START -->', '<!-- REPOSITORIES:END -->'
    assert text.count(start) == text.count(end) == 1
    before, rest = text.split(start)
    _, after = rest.split(end)
    out = ROOT/'_site'
    out.mkdir(exist_ok=True)
    (out/'index.html').write_text(before + start + cards + end + after, encoding='utf-8')
    for name in ['style.css', 'script.js', '.nojekyll']:
        shutil.copy2(ROOT/name, out/name)
    shutil.copytree(ROOT/'assets', out/'assets', dirs_exist_ok=True)

if __name__ == '__main__':
    build()
