// Extracted scripts from project.html

console.log('project page script loaded.');

(function () {
console.log('project page script loaded Double Check.');

function loadingAnimation() {
        const loadingEl = document.getElementById('loading');
        if (!loadingEl) return;
        let dots = 0;
        return setInterval(() => {
            dots = (dots + 1) % 4;
            loadingEl.textContent = 'Loading' + '.'.repeat(dots);
        }, 500);
    }
    const loadingInterval = loadingAnimation();
    
    // Load and render GitHub repos without external plugins
    async function loadRepos(username, count = 5) {
        const container = document.getElementById('repos');
        if (!container) return;
        try {
            console.log('Fetching GitHub repos for', username);
            const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${count}`);
            console.log('GitHub API response status:', res.status);
            if (!res.ok) throw new Error('GitHub API: ' + res.status);
            const repos = await res.json();
            // For forked repos, fetch detail to obtain parent info
            const forks = repos.filter(r => r.fork && r.url);
            if (forks.length) {
                await Promise.all(forks.map(async r => {
                    try {
                        const d = await fetch(r.url);
                        if (!d.ok) return;
                        const detail = await d.json();
                        if (detail.parent) {
                            r._parent = {
                                full_name: detail.parent.full_name,
                                html_url: detail.parent.html_url
                            };
                        }
                    } catch (e) {
                        console.warn('Failed to fetch repo detail for', r.name, e);
                    }
                }));
            }
            if (!Array.isArray(repos) || repos.length === 0) {
                container.innerHTML = '<p>No repositories found.</p>';
                return;
            }
            console.log('Fetched repos:', repos);
            clearInterval(loadingInterval);
            container.innerHTML = repos.map(r => `
                <section class="repo">
                    <h3>
                      <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
                      ${r._parent ? `<small>（Forked from <a href="${r._parent.html_url}" target="_blank" rel="noopener">${r._parent.full_name}</a>）</small>` : ''}
                    </h3>
                    <p>${r.description ? r.description.replace(/</g, '&lt;') : '<em>No description</em>'}</p>
                    <div class="meta">${r.language ? r.language + ' • ' : ''}★ ${r.stargazers_count} • ${r.license ? 'License: ' + (r.license.spdx_id == "NOASSERTION" ? r.license.name : r.license.spdx_id) + ' • ' : ''}Updated: ${new Date(r.updated_at).toLocaleDateString()}</div>
                </section>
            `).join('');
        } catch (err) {
            console.error(err);
            container.innerHTML = '<p>Failed to load GitHub repositories, please try again later or check the console.</p>';
        }
    }
    loadRepos('onenok', 5);

})();
