# Deployment

How `levcreates.com` is built, hosted, and served. The site is a static
Vite + React build published to **GitHub Pages** via **GitHub Actions**, on a
custom domain with enforced HTTPS.

- **Repo:** `BallzOfCheeze/levcreates-portfolio` (public)
- **Live:** https://levcreates.com (and https://www.levcreates.com)
- **Hosting:** GitHub Pages (free)
- **Build/deploy:** GitHub Actions on every push to `main`
- **TLS:** Let's Encrypt cert auto-provisioned by GitHub; HTTPS enforced

---

## 1. How it deploys

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. checks out the repo, installs Node 24 + deps (`npm ci`),
2. runs `npm run build` → static output in `dist/`,
3. uploads `dist/` as a Pages artifact and deploys it (`actions/deploy-pages`).

Pages is configured with **"GitHub Actions"** as the build source (not the
legacy "deploy from a branch" mode). Nothing is built on GitHub from raw
source other than this workflow, and `dist/` is **not** committed (it's in
`.gitignore`).

The custom domain is baked into the build via **`public/CNAME`** (contents:
`levcreates.com`), so every deploy re-asserts the domain. Vite copies
`public/` to the root of `dist/`, so `dist/CNAME` ships automatically.

> **Base path note:** because the site is served at the **root** of a custom
> domain, Vite's default `base: '/'` is correct and all asset references use
> root-absolute paths (`/assets/…`, `/favicon.svg`). If this were ever served
> at `username.github.io/levcreates-portfolio/` instead, `base` would need to
> become `/levcreates-portfolio/`.

### One-time setup (already done)

```bash
# repo already existed empty on GitHub; push the code
git init -b main
git add -A && git commit -m "…"
git remote add origin git@github.com:BallzOfCheeze/levcreates-portfolio.git
git push -u origin main            # SSH push (avoids needing the 'workflow' token scope)

# enable Pages with the GitHub Actions build source
gh api -X POST repos/BallzOfCheeze/levcreates-portfolio/pages -f build_type=workflow

# register the custom domain
gh api -X PUT  repos/BallzOfCheeze/levcreates-portfolio/pages -f cname=levcreates.com
```

---

## 2. DNS (at the registrar — Nomeo, nameservers `ns53.be` / `ns53.io`)

The **apex** uses A records; the **`www`** subdomain uses a CNAME. This split
matters — see the gotchas below.

| Host            | Type  | Value                                      |
|-----------------|-------|--------------------------------------------|
| `@` (apex/root) | A     | `185.199.108.153`                          |
| `@`             | A     | `185.199.109.153`                          |
| `@`             | A     | `185.199.110.153`                          |
| `@`             | A     | `185.199.111.153`                          |
| `@` (optional)  | AAAA  | `2606:50c0:8000::153` … `8003::153`        |
| `www`           | CNAME | `ballzofcheeze.github.io`                  |

Plus GitHub's **domain-verification** record (keep it — see §4):

| Host                                          | Type | Value                            |
|-----------------------------------------------|------|----------------------------------|
| `_github-pages-challenge-BallzOfCheeze`       | TXT  | (value GitHub showed in Settings)|

The four A IPs are GitHub Pages' published anycast addresses.

---

## 3. HTTPS

Once DNS resolves to GitHub and the domain is verified, GitHub automatically
requests a free **Let's Encrypt** certificate covering both `levcreates.com`
and `www.levcreates.com`. After it's issued, **Enforce HTTPS** can be turned
on (Settings → Pages, or `gh api -X PUT …/pages -F https_enforced=true` — note
`-F` for a typed boolean, `-f` sends a string and 422s).

Check status anytime:

```bash
gh api repos/BallzOfCheeze/levcreates-portfolio/pages \
  -q '{domain:.protected_domain_state, cert:.https_certificate.state, https:.https_enforced}'
# done state: {"domain":"verified","cert":"approved","https":true}
```

Independent cross-check via Certificate Transparency logs:
`https://crt.sh/?q=levcreates.com` — a fresh **Let's Encrypt** row (issued
today, names `levcreates.com` + `www.levcreates.com`) confirms the live cert.

---

## 4. Gotchas we actually hit (and the fixes)

These cost the most time — documented so they don't bite again.

1. **Repo owned by root.** The project dir was created as `root`; needed
   `sudo chown -R ballzofcheeze:ballzofcheeze` before any files could be added.

2. **`@` rejected as an apex hostname.** Nomeo doesn't accept `@` for the root.
   The apex record is created by leaving the **Hostnaam field blank/empty**
   (the panel appends `.levcreates.com`, so blank = the root).

3. **AAAA-only on the apex did nothing.** IPv6 (`AAAA`) records alone are not
   enough — GitHub Pages needs the **four A (IPv4) records** on the apex. AAAA
   is optional/supplementary.

4. **"CNAME can't be the same as an A record."** A single host can't have both
   a CNAME and A/AAAA records. We first tried `www` with A records *and* a
   CNAME → conflict. Fix: pick one per host.

5. **`InvalidARecordError` on `www`.** GitHub flags a subdomain that uses A
   records and wants a **CNAME** instead. This was the real blocker holding up
   cert issuance. Fix: **delete the `www` A + AAAA records, add a single
   `www` CNAME → `ballzofcheeze.github.io`.** (The apex *keeps* A records —
   only the subdomain switches to CNAME.)

6. **A stale "working" HTTPS that wasn't GitHub's.** The domain previously ran
   on cPanel hosting with **ZeroSSL** certs. The browser kept showing a cached
   old cert, which looked like HTTPS worked while GitHub's cert was still
   pending. CT logs (crt.sh) made this obvious — they showed old ZeroSSL certs
   and no new Let's Encrypt one yet. Lesson: trust the **GitHub API
   `https_certificate.state`** and CT logs, not the browser cache. Verify in an
   incognito window.

7. **`gh api … -f https_enforced=true` → 422.** `-f` sends the value as a
   string; the API wants a boolean. Use **`-F https_enforced=true`**. And it
   404s with *"certificate does not exist yet"* until the cert is actually
   issued — that's expected, just wait.

8. **No CAA blocker (checked).** A leftover `CAA` record locked to a single CA
   would have blocked Let's Encrypt. We confirmed there were none. Worth
   checking if cert issuance ever stalls with otherwise-correct DNS:
   `https://dns.google/resolve?name=levcreates.com&type=CAA`.

---

## 5. Common tasks

**Deploy a change** — just push to `main`; the workflow rebuilds and publishes.

```bash
git add -A && git commit -m "…" && git push
gh run watch "$(gh run list --limit 1 --json databaseId -q '.[0].databaseId')" --exit-status
```

**Edit content** — almost everything lives in `src/data.js`; drop media into
`public/assets/` and reference it as `/assets/<file>`.

**Don't remove** `public/CNAME`, the apex A records, the `www` CNAME, or the
`_github-pages-challenge-*` TXT — each one keeps the domain/HTTPS working or
verified.
