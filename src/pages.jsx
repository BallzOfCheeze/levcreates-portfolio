// Variation B — secondary pages (Editorial)
import React from 'react'
import { LEV_DATA } from './data.js'
import { B_COL, accentHex, bStyles, imgFilter, BPhoto, BMast, BPageHome } from './core.jsx'

function BSpread({ section, children, asideExtra }) {
  // section = data section object (has full, num, kicker, blurb, accent)
  const ac = accentHex(section.accent)
  const title = section.full
  // Size off the longest unbreakable word so it never overflows the ~260px column.
  const maxWord = Math.max(...title.split(/\s+/).map((w) => w.length))
  const tSize = Math.max(30, Math.min(60, Math.floor(258 / (maxWord * 0.54))))
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', minHeight: 'calc(100% - 80px)' }}>
      <aside style={{ padding: '64px 40px 40px', borderRight: `1px solid ${B_COL.ink}`, position: 'relative' }}>
        <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 18, height: 1, background: ac }} />
          §{section.num}
        </div>
        <h2 style={{ ...bStyles.display, fontSize: tSize, lineHeight: 1.02, margin: '0 0 6px', color: B_COL.ink, letterSpacing: '-0.02em', fontStyle: 'italic', overflowWrap: 'break-word', textWrap: 'balance' }}>
          {title}
        </h2>
        {section.kicker &&
          <div style={{ ...bStyles.mono, fontSize: 10, color: ac, marginTop: 22, letterSpacing: '0.12em' }}>{section.kicker}</div>
        }
        {section.blurb &&
          <p style={{ marginTop: 22, fontSize: 14, lineHeight: 1.65, color: B_COL.ink, opacity: 0.85, maxWidth: 280, textWrap: 'pretty' }}>{section.blurb}</p>
        }
        {asideExtra &&
          <div style={{ marginTop: 24 }}>{asideExtra}</div>
        }
        <div style={{ position: 'absolute', bottom: 28, left: 40, ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.16em' }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: ac, marginRight: 8, verticalAlign: 'middle' }} />
          LEVCREATES
        </div>
      </aside>
      <div style={{ padding: '48px 44px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 22, right: 28, ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.18em' }}>
          {section.full.toUpperCase()} · §{section.num}
        </div>
        {children}
      </div>
    </div>)
}

function sec(id) { return LEV_DATA.sections.find((s) => s.id === id) }

// ---- Photo slider (arrows + dots + counter) ----
function BSlider({ images, accent, ratio = '3/2' }) {
  const [i, setI] = React.useState(0)
  const n = images.length
  const go = (d) => setI((p) => (p + d + n) % n)
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', background: '#000', border: `1px solid ${B_COL.ink}` }}>
        {images.map((src, k) =>
          <img key={k} src={src} alt={`Take My Hand — ${k + 1}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: k === i ? 1 : 0, transition: 'opacity 0.5s ease' }} />,
        )}
        <div style={{ position: 'absolute', top: 12, left: 12, ...bStyles.mono, fontSize: 9, color: B_COL.cream, background: 'rgba(26,17,16,0.74)', padding: '4px 9px', letterSpacing: '0.14em' }}>
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </div>
        <button onClick={() => go(-1)} aria-label="Previous"
          style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(26,17,16,0.6)', color: B_COL.cream, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={() => go(1)} aria-label="Next"
          style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(26,17,16,0.6)', color: B_COL.cream, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
        {images.map((_, k) =>
          <button key={k} onClick={() => setI(k)} aria-label={`Go to ${k + 1}`}
            style={{ width: k === i ? 22 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0, background: k === i ? accent : B_COL.rule, cursor: 'pointer', transition: 'all 0.3s ease' }} />,
        )}
      </div>
    </div>)
}

// ---- Abroad page: three sections; Erasmus · Toronto leads with 3 TikToks ----
function BPageAbroad() {
  const d = LEV_DATA
  const s = sec('abroad')
  const teal = B_COL.teal
  const tk = d.abroadTiktoks || []
  const erasmus = d.abroad[0]
  const second = d.abroad[1]

  const head = (num, label, ac) =>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '0 0 18px' }}>
      <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 22, color: ac, lineHeight: 1 }}>{num}</span>
      <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, letterSpacing: '0.18em' }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: B_COL.rule }}></span>
    </div>

  return (
    <BSpread section={s}>
      {/* ── MOOD OPENER · CANADA ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '232px 1fr', gap: 24, alignItems: 'center', marginBottom: 34 }}>
        <BLoopVideo src="/assets/abroad-canada-mood.mp4" ratio="9/16" tag="CANADA · MOOD" />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: teal, marginBottom: 12, letterSpacing: '0.16em' }}>ERASMUS · ON THE ROAD · 2023</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 42, lineHeight: 1.04, textWrap: 'balance' }}>Four months in Toronto.</div>
          <p style={{ fontSize: 14, lineHeight: 1.62, color: B_COL.ink, opacity: 0.85, marginTop: 16, maxWidth: 440 }}>{erasmus.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 22, borderTop: `1px solid ${B_COL.rule}` }}>
            {[['YEAR', '2023'], ['CITY', 'Toronto, CA'], ['KIT', 'iPhone']].map(([k, v], i) =>
              <div key={k} style={{ padding: '14px 14px 4px', borderRight: i < 2 ? `1px solid ${B_COL.rule}` : 'none' }}>
                <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.mute, letterSpacing: '0.16em', marginBottom: 6 }}>{k}</div>
                <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 18, color: teal }}>{v}</div>
              </div>,
            )}
          </div>
        </div>
      </div>

      {/* ── 01 · ERASMUS · TORONTO — TIKTOK HIGHLIGHTS ── */}
      {head('01', 'ERASMUS · TORONTO', teal)}
      <div style={{ ...bStyles.mono, fontSize: 9, color: teal, marginBottom: 12, letterSpacing: '0.14em' }}>{tk.length > 1 ? `${tk.length} TIKTOKS IN HIGHLIGHT` : 'TIKTOK IN HIGHLIGHT'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 250px)', justifyContent: 'space-between', width: '100%', marginBottom: 44 }}>
        {tk.map((t) => <BTikTok key={t.id} id={t.id} label={`${t.title} · ${t.kind}`} accent={teal} />)}
      </div>

      {/* ── 02 · JOURNALISM · ARAGON ── */}
      <div style={{ marginBottom: 44 }}>
        {head('02', 'JOURNALISM · ARAGON', B_COL.gold)}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: 28, alignItems: 'start' }}>
          {/* LEFT — photo */}
          <a href="/assets/abroad-aragon-river.jpg" target="_blank" rel="noreferrer" style={{ position: 'relative', display: 'block', aspectRatio: '9/16', overflow: 'hidden', border: `1px solid ${B_COL.ink}`, lineHeight: 0 }}>
            <img src="/assets/abroad-aragon-river.jpg" alt="Across the border — Aragon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: 'rgba(26,17,16,0.72)', padding: '4px 8px', letterSpacing: '0.14em' }}>ACROSS THE BORDER</div>
          </a>
          {/* CENTER — text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, padding: '4px 0', alignSelf: 'stretch' }}>
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, marginBottom: 10, letterSpacing: '0.12em' }}>{second.kind} · {second.year}</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 38, lineHeight: 1.04 }}>{second.title}</div>
            <p style={{ fontSize: 14, lineHeight: 1.64, color: B_COL.ink, opacity: 0.85, marginTop: 14 }}>{second.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 22, borderTop: `1px solid ${B_COL.rule}` }}>
              {[['REGION', 'Aragón, ES'], ['FORMAT', 'Cross-border'], ['YEAR', second.year], ['CAMERA', 'iPhone · field']].map(([k, v], i) =>
                <div key={k} style={{ padding: '13px 14px 11px', borderRight: i % 2 === 0 ? `1px solid ${B_COL.rule}` : 'none', borderBottom: i < 2 ? `1px solid ${B_COL.rule}` : 'none' }}>
                  <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.mute, letterSpacing: '0.16em', marginBottom: 5 }}>{k}</div>
                  <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 18, color: B_COL.gold }}>{v}</div>
                </div>,
              )}
            </div>
          </div>
          {/* RIGHT — video */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <BLoopVideo src="/assets/abroad-aragon-snaps.mp4" ratio="9/16" tag="SNAPS" sound />
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginTop: 10, letterSpacing: '0.14em' }}>▸ TAP TO PLAY WITH SOUND</div>
          </div>
        </div>
      </div>

      {/* ── 03 · TAKE MY HAND · SRI LANKA ── */}
      <div>
        {head('03', 'TAKE MY HAND · SRI LANKA', B_COL.burgundy)}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 30, alignItems: 'center' }}>
          <BSlider images={d.abroadSrilanka} accent={B_COL.burgundy} ratio="3/2" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.burgundy, marginBottom: 10, letterSpacing: '0.12em' }}>VOLUNTEER · TEA PLANTATIONS · AGES 10–17</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 40, lineHeight: 1.02 }}>Take My Hand</div>
            <p style={{ fontSize: 14, lineHeight: 1.66, color: B_COL.ink, opacity: 0.86, marginTop: 14, textWrap: 'pretty' }}>
              From the ages of 10 to 17, my mom and I were part of a volunteer project in the south of Sri Lanka called <em>Take My Hand</em>. We built and ran schools in the tea plantations for children who couldn't afford an education.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.66, color: B_COL.ink, opacity: 0.86, marginTop: 12, textWrap: 'pretty' }}>
              We taught them basic language, maths, sports and social skills — year after year, the same faces growing up alongside me.
            </p>
            <div style={{ display: 'flex', gap: 0, marginTop: 22, borderTop: `1px solid ${B_COL.rule}` }}>
              {[['SINCE', 'Age 10'], ['WHERE', 'South Sri Lanka'], ['WITH', 'My mom']].map(([k, v], idx) =>
                <div key={k} style={{ flex: 1, padding: '13px 14px 4px', borderRight: idx < 2 ? `1px solid ${B_COL.rule}` : 'none' }}>
                  <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.mute, letterSpacing: '0.16em', marginBottom: 5 }}>{k}</div>
                  <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 17, color: B_COL.burgundy }}>{v}</div>
                </div>,
              )}
            </div>
          </div>
        </div>
      </div>
    </BSpread>)
}

// Loads the YouTube IFrame Player API once; resolves with window.YT.
let _ytApiPromise = null
function loadYTApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (_ytApiPromise) return _ytApiPromise
  _ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { if (prev) { try { prev() } catch (e) {} } resolve(window.YT) }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return _ytApiPromise
}

// Inline YouTube player: themed thumbnail + play button → click loads the video
// via the IFrame API and plays WITH SOUND. Sets origin (fixes "error 153") and
// catches embed errors, falling back to a "Watch on YouTube" link.
function BFilmPlayer({ id, title, kind, year, accent, big, noCaption, fillHeight }) {
  const ac = accent || B_COL.red
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const [error, setError] = React.useState(false)
  const hostRef = React.useRef(null)
  const playerRef = React.useRef(null)
  const meta = [kind, year].filter(Boolean).join(' · ')
  const watchUrl = id ? `https://youtu.be/${id}` : null

  React.useEffect(() => {
    if (!active || !id) return
    let destroyed = false
    setError(false)
    loadYTApi().then((YT) => {
      if (destroyed || !hostRef.current) return
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: id,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (e) => {
            const f = e.target.getIframe && e.target.getIframe()
            if (f) { f.style.position = 'absolute'; f.style.inset = '0'; f.style.width = '100%'; f.style.height = '100%'; f.style.border = 'none' }
            try { e.target.unMute(); e.target.setVolume(100); e.target.playVideo() } catch (_) {}
          },
          onError: () => setError(true),
        },
      })
    })
    return () => { destroyed = true; try { playerRef.current && playerRef.current.destroy() } catch (_) {} playerRef.current = null }
  }, [active, id])

  return (
    <div style={fillHeight ? { height: '100%', display: 'flex' } : undefined}>
      <div
        onClick={() => id && !active && setActive(true)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ position: 'relative', aspectRatio: '16/9', ...(fillHeight ? { height: '100%' } : {}), overflow: 'hidden', background: B_COL.ink, border: `1px solid ${B_COL.ink}`, cursor: id && !active ? 'pointer' : 'default' }}>

        {!id ? (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            background: `repeating-linear-gradient(45deg, ${B_COL.ink}, ${B_COL.ink} 12px, #221512 12px, #221512 24px)`,
          }}>
            <div style={{ width: big ? 76 : 54, height: big ? 76 : 54, borderRadius: '50%', border: `2px dashed ${ac}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: `${big ? 13 : 10}px solid transparent`, borderBottom: `${big ? 13 : 10}px solid transparent`, borderLeft: `${big ? 20 : 15}px solid ${ac}`, marginLeft: 5, opacity: 0.85 }} />
            </div>
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, letterSpacing: '0.16em' }}>PASTE YOUTUBE LINK</div>
          </div>
        ) : active && !error ? (
          <div ref={hostRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        ) : active && error ? (
          <a href={watchUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: B_COL.ink, color: B_COL.cream }}>
            <div style={{ width: big ? 80 : 58, height: big ? 80 : 58, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: `${big ? 14 : 11}px solid transparent`, borderBottom: `${big ? 14 : 11}px solid transparent`, borderLeft: `${big ? 22 : 16}px solid ${B_COL.cream}`, marginLeft: 5 }} />
            </div>
            <div style={{ ...bStyles.mono, fontSize: 10, letterSpacing: '0.14em' }}>WATCH ON YOUTUBE ↗</div>
            <div style={{ ...bStyles.mono, fontSize: 8, opacity: 0.6, maxWidth: '70%', textAlign: 'center', lineHeight: 1.5 }}>This video can't be embedded — opens in a new tab.</div>
          </a>
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
              alt={title}
              onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg` }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hover ? 'none' : imgFilter(), transition: 'filter .4s, transform .6s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hover ? 'rgba(26,17,16,0.16)' : 'rgba(26,17,16,0.34)', transition: 'background .3s' }}>
              <div style={{ width: big ? 84 : 60, height: big ? 84 : 60, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.45)', transform: hover ? 'scale(1.07)' : 'scale(1)', transition: 'transform .25s' }}>
                <div style={{ width: 0, height: 0, borderTop: `${big ? 15 : 11}px solid transparent`, borderBottom: `${big ? 15 : 11}px solid transparent`, borderLeft: `${big ? 23 : 17}px solid ${B_COL.cream}`, marginLeft: big ? 6 : 5 }} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: 12, left: 12, ...bStyles.mono, fontSize: 9, color: B_COL.cream, background: ac, padding: '3px 8px', letterSpacing: '0.1em' }}>{kind}</div>
          </>
        )}
      </div>
      {!noCaption &&
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: big ? 14 : 10, gap: 12 }}>
          <div>
            <div style={{ ...bStyles.mono, fontSize: big ? 10 : 9, color: ac, marginBottom: big ? 5 : 4 }}>{meta || '—'}</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: big ? 44 : 22, lineHeight: 1.04 }}>{title}</div>
          </div>
          {watchUrl &&
            <a href={watchUrl} target="_blank" rel="noreferrer" title="Watch on YouTube"
              style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, textDecoration: 'none', whiteSpace: 'nowrap', opacity: 0.7 }}>YT ↗</a>}
        </div>}
    </div>)
}

function BPageFilm() {
  const d = LEV_DATA
  const fp = d.filmPage
  const h = fp.highlight

  const groupHead = (num, theme, kicker, color) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ ...bStyles.mono, fontSize: 10, color: color, letterSpacing: '0.14em' }}>§04.{num}</span>
        <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 30, lineHeight: 1 }}>{theme}</span>
        <span style={{ flex: 1, height: 1, background: B_COL.rule }} />
      </div>
      <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.14em' }}>{kicker}</div>
    </div>)

  return (
    <BSpread section={sec('film')}>
      {/* ─── HIGHLIGHT ─── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.red, letterSpacing: '0.16em' }}>★ HIGHLIGHT</span>
          <span style={{ flex: 1, height: 1, background: B_COL.rule }} />
          <span style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.16em' }}>{h.festival.toUpperCase()} · {h.year}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '260fr 654fr', gap: 22, alignItems: 'start', maxWidth: '100%' }}>
          <a href={h.poster} target="_blank" rel="noreferrer" style={{ display: 'block', border: `1px solid ${B_COL.ink}`, lineHeight: 0 }}>
            <img src={h.poster} alt="Text Me When You're Home poster" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </a>
          <div style={{ minWidth: 0 }}>
            <BFilmPlayer {...h} accent={B_COL.red} big noCaption />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12, gap: 12 }}>
              <div>
                <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.red, marginBottom: 4 }}>{[h.kind, h.year].filter(Boolean).join(' · ')}</div>
                <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 24, lineHeight: 1.04 }}>{h.title}</div>
              </div>
              <a href={`https://youtu.be/${h.id}`} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, textDecoration: 'none', whiteSpace: 'nowrap', opacity: 0.7 }}>YT ↗</a>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.62, color: B_COL.ink, opacity: 0.85, marginTop: 14, textWrap: 'pretty' }}>{h.blurb}</p>
          </div>
        </div>
      </div>

      {/* ─── THEMED GROUPS ─── */}
      {fp.groups.map((g) => {
        const ac = accentHex(g.accent)
        return (
          <div key={g.id} style={{ marginBottom: 36 }}>
            {groupHead(g.num, g.theme, g.kicker, ac)}
            {g.blurb &&
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: B_COL.mute, margin: '0 0 18px', maxWidth: 520 }}>{g.blurb}</p>}
            {g.poster ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '260fr 654fr', gap: 22, alignItems: 'start', maxWidth: '100%' }}>
                  <a href={g.poster} target="_blank" rel="noreferrer" style={{ display: 'block', border: `1px solid ${B_COL.ink}`, lineHeight: 0 }}>
                    <img src={g.poster} alt="Gourmet Hound poster" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </a>
                  <div style={{ minWidth: 0 }}>
                    {g.videos.map((v, i) => <BFilmPlayer key={i} {...v} accent={ac} noCaption />)}
                  </div>
                </div>
                {g.videos[0] &&
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12, gap: 12 }}>
                    <div>
                      <div style={{ ...bStyles.mono, fontSize: 9, color: ac, marginBottom: 4 }}>{[g.videos[0].kind, g.videos[0].year].filter(Boolean).join(' · ')}</div>
                      <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 22, lineHeight: 1.04 }}>{g.videos[0].title}</div>
                    </div>
                    <a href={`https://youtu.be/${g.videos[0].id}`} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, textDecoration: 'none', whiteSpace: 'nowrap', opacity: 0.7 }}>YT ↗</a>
                  </div>}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: g.videos.length === 1 ? '1fr' : '1fr 1fr', gap: 22 }}>
                {g.videos.map((v, i) => <BFilmPlayer key={i} {...v} accent={ac} />)}
              </div>
            )}
          </div>)
      })}
    </BSpread>)
}

function BPageMusic() {
  const d = LEV_DATA
  const ac = accentHex(sec('music').accent)
  const SPOT = '#1DB954'
  const links = d.musicLinks
  const platforms = [
    { label: 'Spotify',     url: links.spotify, brand: SPOT },
    { label: 'Apple Music', url: links.apple },
    { label: 'SoundCloud',  url: links.soundcloud },
    { label: 'TikTok',      url: links.tiktok },
    { label: 'Instagram',   url: links.instagram },
  ]
  return (
    <BSpread section={sec('music')} asideExtra={
      <div style={{ position: 'relative', width: '100%' }}>
        <BPhoto src={d.musicPhoto} ratio="3/4" accent="gold" label="STUDIO" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: ac, padding: '4px 8px', letterSpacing: '0.12em' }}>IN THE STUDIO</div>
      </div>
    }>
      {/* Hero: left = artist panel, right = platform buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 24, marginBottom: 22, alignItems: 'stretch' }}>
        <div style={{ background: B_COL.ink, color: B_COL.cream, padding: 26, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...bStyles.mono, fontSize: 10, color: ac, marginBottom: 12 }}>THE ARTIST PROJECT</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 48, lineHeight: 1, marginBottom: 8 }}>Lev.</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, maxWidth: 360, opacity: 0.88 }}>{d.musicIntro}</div>
          <a href={links.spotify} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 10, color: '#fff', background: SPOT, padding: '10px 16px', textDecoration: 'none', marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-block', borderRadius: 40 }}>● OPEN ON SPOTIFY ↗</a>
          <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${ac}, ${B_COL.burgundy} 55%, transparent 75%)`, opacity: 0.6 }} />
        </div>

        <div style={{ background: B_COL.paper, padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: ac, marginBottom: 14 }}>LISTEN &amp; FOLLOW</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {platforms.map(p =>
              <a key={p.label} href={p.url} target="_blank" rel="noreferrer" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '13px 16px', textDecoration: 'none',
                background: p.brand ? p.brand : 'transparent',
                color: p.brand ? '#fff' : B_COL.ink,
                border: p.brand ? 'none' : `1px solid ${B_COL.ink}` }}>
                <span style={{ ...bStyles.display, fontSize: 18, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{p.label}</span>
                <span style={{ ...bStyles.mono, fontSize: 10, opacity: 0.9 }}>↗</span>
              </a>,
            )}
          </div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginTop: 'auto', paddingTop: 18, lineHeight: 1.7 }}>
            OLDER RELEASES LIVE ON SPOTIFY —<br />THIS PAGE KEEPS THE LATEST UP TOP.
          </div>
        </div>
      </div>

      {/* Latest release — Spotify embed */}
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ ...bStyles.mono, fontSize: 10, color: ac, letterSpacing: '0.14em' }}>★ LATEST RELEASE</div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute }}>SPOTIFY</div>
        </div>
        <iframe title="Latest release on Spotify"
          src={`https://open.spotify.com/embed/track/${d.latestSpotifyTrack}?utm_source=generator&theme=0`}
          width="100%" height="152" frameBorder="0" loading="lazy"
          style={{ borderRadius: 12, border: `1px solid ${B_COL.rule}`, display: 'block' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      </div>

      {/* SoundCloud highlight */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ ...bStyles.mono, fontSize: 10, color: ac, letterSpacing: '0.14em' }}>ALSO ON SOUNDCLOUD</div>
          <a href={links.soundcloud} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, textDecoration: 'none' }}>FULL PROFILE ↗</a>
        </div>
        <iframe title="On SoundCloud" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(d.soundcloudHighlight)}&color=%23b07d1e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true`}
          style={{ border: `1px solid ${B_COL.rule}`, display: 'block' }}></iframe>
      </div>

      {/* YouTube highlight */}
      <div style={{ marginTop: 28, marginBottom: 8 }}>
        <div style={{ ...bStyles.mono, fontSize: 10, color: ac, letterSpacing: '0.14em', marginBottom: 12 }}>WATCH</div>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', border: `1px solid ${B_COL.rule}` }}>
          <iframe title="On YouTube"
            src={`https://www.youtube-nocookie.com/embed/${d.musicYouTube}?rel=0`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}></iframe>
        </div>
      </div>
    </BSpread>)
}

function BPageJournalism() {
  const d = LEV_DATA
  const ac = accentHex(sec('journalism').accent)
  return (
    <BSpread section={sec('journalism')} asideExtra={
      <div style={{ position: 'relative', width: '100%' }}>
        <BPhoto src={d.journalismPhoto} ratio="4/3" accent="teal" label="ON LOCATION" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: B_COL.teal, padding: '4px 8px', letterSpacing: '0.12em' }}>IN THE FIELD</div>
      </div>
    }>
      {/* Two flagship Readymag projects — obvious external clickables */}
      <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 12, letterSpacing: '0.14em' }}>FLAGSHIP PROJECTS · READ IN FULL ON READYMAG ↗</div>
      <div style={{ marginBottom: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {d.journalism.map((j, i) =>
          <a key={i} href={j.url} target="_blank" rel="noreferrer" style={{ background: i === 0 ? B_COL.teal : B_COL.ink, color: B_COL.cream, padding: 28, textDecoration: 'none', minHeight: 270, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', border: `1px solid ${i === 0 ? B_COL.teal : B_COL.ink}`, transition: 'transform .2s, box-shadow .2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.22)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            <div>
              <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.ink, background: i === 0 ? B_COL.gold : ac, padding: '4px 8px', display: 'inline-block', letterSpacing: '0.1em', marginBottom: 16 }}>{j.tag}</div>
              <div style={{ ...bStyles.display, fontSize: 40, lineHeight: 1.0, fontStyle: 'italic' }}>{j.title}</div>
              <div style={{ ...bStyles.mono, fontSize: 9, color: i === 0 ? B_COL.cream : ac, marginTop: 10, opacity: 0.9 }}>{j.kind}</div>
              <p style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85, marginTop: 14, maxWidth: 340 }}>{j.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, paddingTop: 14, borderTop: `1px solid ${B_COL.cream}33`, ...bStyles.mono, fontSize: 10 }}>
              <span style={{ background: B_COL.cream, color: B_COL.ink, padding: '8px 12px' }}>OPEN PROJECT ↗</span>
              <span style={{ opacity: 0.7 }}>{j.year}</span>
            </div>
          </a>,
        )}
      </div>

      {/* Video reportage */}
      <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 12, letterSpacing: '0.14em' }}>ON CAMERA · VIDEO REPORTAGE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {d.journalismVideos.map((v) =>
          <BFilmPlayer key={v.id} {...v} accent={B_COL.teal} />,
        )}
      </div>
    </BSpread>)
}

// Muted autoplay-loop video (vertical or horizontal).
// Pass sound={true} for a click-to-play-with-sound clip with a play button.
function BLoopVideo({ src, ratio = '9/16', tag, height, controls = false, sound = false }) {
  const ref = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  const toggle = (e) => {
    e.preventDefault()
    const v = ref.current; if (!v) return
    if (v.paused) { v.muted = false; v.play().catch(() => {}) }
    else { v.pause() }
  }
  React.useEffect(() => {
    if (!sound) return
    const v = ref.current; if (!v) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause) }
  }, [sound])
  return (
    <div onClick={sound ? toggle : undefined} style={{ position: 'relative', aspectRatio: ratio, height, overflow: 'hidden', background: '#000', border: `1px solid ${B_COL.ink}`, cursor: sound ? 'pointer' : 'default' }}>
      <video src={src} autoPlay={!sound} loop playsInline muted={!sound} controls={controls}
        ref={(el) => { ref.current = el; if (el && !sound) el.muted = true }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {tag &&
        <div style={{ position: 'absolute', top: 12, left: 12, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: 'rgba(26,17,16,0.72)', padding: '4px 8px', letterSpacing: '0.14em', pointerEvents: 'none' }}>{tag}</div>
      }
      {sound && !playing &&
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,17,16,0.28)', pointerEvents: 'none' }}>
          <div style={{ width: 66, height: 66, borderRadius: '50%', background: B_COL.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.45)' }}>
            <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `18px solid ${B_COL.ink}`, marginLeft: 5 }} />
          </div>
        </div>
      }
    </div>)
}

// Portfolio-in-portfolio viewer — renders the PDF pages live with pdf.js.
function BPortfolioSlider({ src, total = 0, accent, label = 'PORTEFOLIO · INSPIRATIELABS' }) {
  const ac = accent || B_COL.gold
  const canvasRef = React.useRef(null)
  const pdfRef = React.useRef(null)
  const taskRef = React.useRef(null)
  const [page, setPage] = React.useState(1)
  const [numPages, setNumPages] = React.useState(total)
  const [loaded, setLoaded] = React.useState(false)
  const [err, setErr] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    if (!window.pdfjsLib) { setErr(true); return }
    window.pdfjsLib.getDocument(src).promise.then((pdf) => {
      if (cancelled) return
      pdfRef.current = pdf
      setNumPages(pdf.numPages)
      setLoaded(true)
    }).catch(() => setErr(true))
    return () => { cancelled = true }
  }, [src])

  React.useEffect(() => {
    const pdf = pdfRef.current
    if (!pdf || !loaded) return
    let cancelled = false
    pdf.getPage(page).then((pg) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return
      const cw = canvas.parentElement.clientWidth || 600
      const vp1 = pg.getViewport({ scale: 1 })
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const scale = (cw / vp1.width) * dpr
      const vp = pg.getViewport({ scale })
      canvas.width = vp.width; canvas.height = vp.height
      canvas.style.width = '100%'; canvas.style.height = 'auto'
      if (taskRef.current) { try { taskRef.current.cancel() } catch (e) {} }
      const task = pg.render({ canvasContext: canvas.getContext('2d'), viewport: vp })
      taskRef.current = task
      task.promise.catch(() => {})
    })
    return () => { cancelled = true }
  }, [page, loaded])

  const go = (d) => setPage((p) => Math.min(Math.max(1, p + d), numPages || 1))
  const navBtn = (label, onClick, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{
      ...bStyles.mono, fontSize: 13, width: 40, height: 40, flex: '0 0 auto',
      background: disabled ? 'transparent' : B_COL.ink, color: disabled ? B_COL.mute : B_COL.cream,
      border: `1px solid ${disabled ? B_COL.rule : B_COL.ink}`, cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1, transition: 'opacity .2s',
    }}>{label}</button>)

  return (
    <div style={{ border: `1px solid ${B_COL.ink}`, background: B_COL.ink }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}>
        {navBtn('‹', () => go(-1), page <= 1)}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', aspectRatio: '16/9', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {err ?
            <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, textAlign: 'center', padding: 20 }}>COULDN'T LOAD THE PDF</div> :
            <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }} />
          }
          {!loaded && !err &&
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...bStyles.mono, fontSize: 10, color: B_COL.gold }}>LOADING…</div>
          }
          <div style={{ position: 'absolute', top: 10, left: 10, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: 'rgba(26,17,16,0.72)', padding: '4px 8px', letterSpacing: '0.14em' }}>{label}</div>
        </div>
        {navBtn('›', () => go(1), numPages ? page >= numPages : true)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {Array.from({ length: numPages || 0 }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} aria-label={`Page ${i + 1}`} style={{
              width: page === i + 1 ? 22 : 9, height: 9, borderRadius: 5, border: 'none', padding: 0,
              background: page === i + 1 ? ac : 'rgba(243,237,224,0.3)', cursor: 'pointer', transition: 'width .2s, background .2s',
            }} />
          ))}
        </div>
        <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.gold, flex: '0 0 auto' }}>{String(page).padStart(2, '0')} / {String(numPages || total).padStart(2, '0')}</div>
      </div>
    </div>)
}

function BPageComms() {
  const d = LEV_DATA
  const s = sec('comms')
  const ac = accentHex(s.accent) // burgundy
  const c = d.commsPage

  const blockHead = (num, label, color) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 16px' }}>
      <span style={{ ...bStyles.mono, fontSize: 10, color: color, letterSpacing: '0.14em' }}>§03.{num}</span>
      <span style={{ flex: 1, height: 1, background: B_COL.rule }} />
      <span style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.16em' }}>{label}</span>
    </div>)

  return (
    <BSpread section={s} asideExtra={
      <div style={{ position: 'relative', width: '100%' }}>
        <BPhoto src={c.radio.photo} ratio="3/4" accent="burgundy" label="RADIO STUDIO" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: ac, padding: '4px 8px', letterSpacing: '0.12em' }}>ON AIR · IN STUDIO</div>
      </div>
    }>
      {/* ─── 01 · FEATURED — NOORDZEEDRONES ─── */}
      {blockHead('01', 'FLAGSHIP · FINAL PROJECT', ac)}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 22, marginBottom: 38, alignItems: 'stretch' }}>
        <div style={{ background: B_COL.burgundy, color: B_COL.cream, padding: 30, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.ink, background: B_COL.gold, padding: '4px 9px', display: 'inline-block', alignSelf: 'flex-start', letterSpacing: '0.1em', marginBottom: 18 }}>{c.noordzee.tagline.toUpperCase()}</div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, marginBottom: 8, letterSpacing: '0.12em' }}>FEATURED · {c.noordzee.kind}</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 31, lineHeight: 1.0, whiteSpace: 'nowrap' }}>{c.noordzee.title}</div>
          <p style={{ fontSize: 14, lineHeight: 1.62, opacity: 0.9, marginTop: 14, maxWidth: 440 }}>{c.noordzee.desc}</p>
          <div style={{ marginTop: 20, alignSelf: 'stretch' }}>
            <img src="/assets/noordzee-logo.png" alt="Noordzee Drones" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
              <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 17, color: B_COL.gold }}>Final communication report</span>
              <span style={{ color: B_COL.gold, fontSize: 20, lineHeight: 1, transform: 'translateY(1px)' }}>↓</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={c.noordzee.canva} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 10, color: B_COL.ink, background: B_COL.gold, padding: '12px 18px', textDecoration: 'none' }}>OPEN THE PROJECT · CANVA ↗</a>
              <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.cream, opacity: 0.7 }}>{c.noordzee.year}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${B_COL.gold}, ${B_COL.red} 55%, transparent 75%)`, opacity: 0.45 }} />
        </div>
        <div>
          <BLoopVideo src={c.noordzee.tiktok} ratio="9/16" tag="TIKTOK · CODED CAPTIONS" sound />
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginTop: 10, lineHeight: 1.5 }}>{c.noordzee.tiktokNote}</div>
        </div>
      </div>

      {/* ─── 02 · CROMBÉ WINES & SPIRITS ─── */}
      {blockHead('02', 'INTERNSHIP', B_COL.teal)}
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.2fr 0.95fr', gap: 18, marginBottom: 14, alignItems: 'stretch' }}>
        <BLoopVideo src={c.crombe.video} ratio="9/16" tag="CONTENT VIDEO" sound />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4px 6px' }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.teal, marginBottom: 10, letterSpacing: '0.12em' }}>{c.crombe.kind}</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 38, lineHeight: 1.02 }}>{c.crombe.title}</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.62, color: B_COL.ink, opacity: 0.85, marginTop: 12 }}>{c.crombe.desc}</p>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginTop: 14 }}>{c.crombe.videoNote}</div>
        </div>
        <a href={c.crombe.magazine} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', background: B_COL.ink, color: B_COL.cream, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.25)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
          <div>
            <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.ink, background: B_COL.gold, padding: '4px 8px', display: 'inline-block', letterSpacing: '0.1em', marginBottom: 16 }}>FULL MAGAZINE</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 34, lineHeight: 1.0 }}>{c.crombe.magazineTitle}</div>
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, marginTop: 8 }}>{c.crombe.magazineIssue}</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.55, opacity: 0.85, marginTop: 12 }}>{c.crombe.magazineDesc}</p>
          </div>
          <span style={{ ...bStyles.mono, fontSize: 10, background: B_COL.cream, color: B_COL.ink, padding: '8px 12px', alignSelf: 'flex-start', marginTop: 16 }}>READ THE MAGAZINE ↗</span>
        </a>
      </div>

      {/* ─── 03 · RADIO ─── */}
      <div style={{ marginTop: 24 }}>
        {blockHead('03', 'RADIO · LIVE', ac)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, marginBottom: 38, alignItems: 'stretch' }}>
        <div>
          <BLoopVideo src={c.radio.video} ratio="16/9" tag="IN STUDIO · SILENT" />
        </div>
        <div style={{ background: B_COL.paper, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${B_COL.rule}` }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: ac, marginBottom: 10, letterSpacing: '0.12em' }}>{c.radio.kind}</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 34, lineHeight: 1.02 }}>{c.radio.title}</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: B_COL.ink, opacity: 0.85, marginTop: 10 }}>{c.radio.desc}</p>
        </div>
      </div>

      {/* ─── 04 · PORTFOLIO-IN-PORTFOLIO ─── */}
      {blockHead('04', 'DEGREE PROJECT', B_COL.gold)}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 16 }}>
        <div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, marginBottom: 8, letterSpacing: '0.12em' }}>{c.portfolio.kind}</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 32, lineHeight: 1.05 }}>{c.portfolio.title}</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: B_COL.mute, marginTop: 8, maxWidth: 540 }}>{c.portfolio.desc}</p>
        </div>
        <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, whiteSpace: 'nowrap', letterSpacing: '0.12em' }}>FLIP THROUGH →</div>
      </div>
      <BPortfolioSlider src={c.portfolio.pdf} total={13} accent={B_COL.gold} />
    </BSpread>)
}

// TikTok embed — click-to-play. Shows the real video cover (via TikTok oEmbed)
// with a play button; the TikTok player only loads (and plays) once tapped.
function BTikTok({ id, label, accent }) {
  const ac = accent || B_COL.gold
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const [thumb, setThumb] = React.useState(null)
  React.useEffect(() => {
    let cancelled = false
    fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@lev.wav/video/${id}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled && d && d.thumbnail_url) setThumb(d.thumbnail_url) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [id])
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...bStyles.mono, fontSize: 9, color: ac, marginBottom: 8, letterSpacing: '0.14em', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 14, height: 1, background: ac }} />{label}
      </div>
      <div
        onClick={() => !active && setActive(true)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ position: 'relative', width: '100%', aspectRatio: '9/16', border: `1px solid ${B_COL.ink}`, overflow: 'hidden', cursor: active ? 'default' : 'pointer',
          background: `repeating-linear-gradient(45deg, ${B_COL.ink}, ${B_COL.ink} 12px, #221512 12px, #221512 24px)` }}>
        {active ? (
          <iframe
            title={`TikTok ${id}`}
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&description=0&music_info=0`}
            allow="autoplay; encrypted-media; fullscreen"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        ) : (
          <>
            {thumb &&
              <img src={thumb} alt={label}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: hover ? 'none' : imgFilter(), transition: 'filter .4s, transform .6s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: hover ? 'rgba(26,17,16,0.22)' : 'rgba(26,17,16,0.4)', transition: 'background .3s' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.45)', transform: hover ? 'scale(1.07)' : 'scale(1)', transition: 'transform .25s' }}>
                <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: `17px solid ${B_COL.ink}`, marginLeft: 5 }} />
              </div>
              <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.cream, letterSpacing: '0.16em', opacity: 0.9, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>WATCH ON TIKTOK</div>
            </div>
          </>
        )}
      </div>
    </div>)
}

function BPageFreelance() {
  const d = LEV_DATA
  const s = sec('freelance')
  const ac = accentHex(s.accent) // gold
  const fp = d.freelancePage
  const h = fp.highlight

  const groupHead = (num, theme, kicker, color) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ ...bStyles.mono, fontSize: 10, color: color, letterSpacing: '0.14em' }}>§05.{num}</span>
        <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 30, lineHeight: 1 }}>{theme}</span>
        <span style={{ flex: 1, height: 1, background: B_COL.rule }} />
      </div>
      <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.14em' }}>{kicker}</div>
    </div>)

  return (
    <BSpread section={s} asideExtra={
      <div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: B_COL.ink, opacity: 0.82, margin: '0 0 16px', maxWidth: 280, textWrap: 'pretty' }}>{fp.intro}</p>
        <a href={fp.authorUrl} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 10, color: B_COL.cream, background: ac, padding: '12px 16px', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.1em' }}>READ THE FULL ARCHIVE ↗</a>
        <div style={{ ...bStyles.mono, fontSize: 8.5, color: B_COL.mute, marginTop: 10, letterSpacing: '0.12em' }}>EVERYTHING ON {fp.outlet.toUpperCase()}</div>
      </div>
    }>
      {/* ─── HIGHLIGHT — Wu-Tang live review ─── */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ ...bStyles.mono, fontSize: 10, color: ac, letterSpacing: '0.16em' }}>★ FLAGSHIP REVIEW</span>
          <span style={{ flex: 1, height: 1, background: B_COL.rule }} />
          <span style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.16em' }}>{fp.outlet.toUpperCase()} · LIVE</span>
        </div>
        <a href={h.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, border: `1px solid ${B_COL.ink}`, background: B_COL.ink }}
          onMouseEnter={(e) => { const im = e.currentTarget.querySelector('img'); if (im) im.style.transform = 'scale(1.04)' }}
          onMouseLeave={(e) => { const im = e.currentTarget.querySelector('img'); if (im) im.style.transform = 'scale(1)' }}>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 340, background: `repeating-linear-gradient(45deg, #221512, #221512 11px, ${B_COL.ink} 11px, ${B_COL.ink} 22px)` }}>
            <img src={h.image} alt={h.title}
              onError={(e) => { e.currentTarget.style.display = 'none'; const f = e.currentTarget.nextSibling; if (f) f.style.display = 'flex' }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: imgFilter(), transition: 'transform .6s' }} />
            <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', ...bStyles.mono, fontSize: 10, color: B_COL.gold, letterSpacing: '0.16em', textAlign: 'center', padding: 20 }}>WU-TANG CLAN<br />@ ING ARENA</div>
            <div style={{ position: 'absolute', top: 12, left: 12, ...bStyles.mono, fontSize: 9, color: B_COL.ink, background: ac, padding: '3px 8px', letterSpacing: '0.1em' }}>LIVE REVIEW</div>
            <div style={{ position: 'absolute', bottom: 10, right: 12, ...bStyles.mono, fontSize: 8, color: B_COL.cream, opacity: 0.7, letterSpacing: '0.1em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>{h.credit}</div>
          </div>
          <div style={{ padding: '30px 30px', color: B_COL.cream, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ ...bStyles.mono, fontSize: 9, color: ac, marginBottom: 12, letterSpacing: '0.12em' }}>{h.kind}</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 30, lineHeight: 1.04, textWrap: 'balance' }}>{h.title}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.85, marginTop: 12, maxWidth: 420, textWrap: 'pretty' }}>{h.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 16, ...bStyles.mono, fontSize: 9, color: B_COL.cream, opacity: 0.7, flexWrap: 'wrap' }}>
              <span>BY</span>
              <span onClick={(e) => { e.preventDefault(); window.open(fp.authorUrl, '_blank', 'noopener') }}
                style={{ color: ac, textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>{h.author.toUpperCase()}</span>
              <span style={{ opacity: 0.6 }}>· {h.date.toUpperCase()} · {h.readtime.toUpperCase()}</span>
            </div>
            <span style={{ ...bStyles.mono, fontSize: 10, background: B_COL.cream, color: B_COL.ink, padding: '10px 14px', alignSelf: 'flex-start', marginTop: 20 }}>READ THE FULL REVIEW ↗</span>
          </div>
        </a>
      </div>

      {/* ─── 01 · FESTIVAL & CONCERT VLOGS ─── */}
      <div style={{ marginBottom: 44 }}>
        {groupHead('01', 'On the floor', 'FESTIVAL & CONCERT VLOGS · TIKTOK', ac)}
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: B_COL.mute, margin: '0 0 18px', maxWidth: 520 }}>The reviews have a second life on TikTok — quick vlogs and impressions filmed at the festivals and concerts I cover.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {fp.tiktoks.map((t) => <BTikTok key={t.id} id={t.id} label={t.label} accent={ac} />)}
        </div>
      </div>

      {/* ─── 02 · XXXTENTACION REBRAND ─── */}
      <div style={{ marginBottom: 8 }}>
        {groupHead('02', fp.rebrand.title, fp.rebrand.kind.toUpperCase(), B_COL.red)}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: B_COL.ink, opacity: 0.85, margin: 0, maxWidth: 540, textWrap: 'pretty' }}>{fp.rebrand.desc}</p>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, whiteSpace: 'nowrap', letterSpacing: '0.12em' }}>FLIP THROUGH →</div>
        </div>
        <BPortfolioSlider src={fp.rebrand.pdf} total={fp.rebrand.pages} accent={B_COL.red} label="XXXTENTACION · REBRAND" />
      </div>
    </BSpread>)
}

function BCvThumb({ src, accent = 'teal' }) {
  const ac = accentHex(accent)
  const canvasRef = React.useRef(null)
  const [err, setErr] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    let cancelled = false
    if (!window.pdfjsLib) { setErr(true); return }
    window.pdfjsLib.getDocument(src).promise.then((pdf) => pdf.getPage(1)).then((pg) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return
      const cw = canvas.parentElement.clientWidth || 280
      const vp1 = pg.getViewport({ scale: 1 })
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const scale = (cw / vp1.width) * dpr
      const vp = pg.getViewport({ scale })
      canvas.width = vp.width; canvas.height = vp.height
      canvas.style.width = '100%'; canvas.style.height = 'auto'
      pg.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
        .then(() => { if (!cancelled) setLoaded(true) })
        .catch(() => {})
    }).catch(() => setErr(true))
    return () => { cancelled = true }
  }, [src])
  return (
    <div style={{ position: 'relative', border: `1px solid ${B_COL.ink}`, background: '#fff', padding: 6, lineHeight: 0 }}>
      {err ?
        <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, padding: 18, textAlign: 'center', lineHeight: 1.5 }}>OPEN THE PDF TO VIEW THE CV</div> :
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
      }
      {!loaded && !err &&
        <div style={{ position: 'absolute', inset: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', ...bStyles.mono, fontSize: 10, color: ac, background: '#fff' }}>LOADING CV…</div>
      }
      <div style={{ position: 'absolute', top: 12, left: 12, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: ac, padding: '4px 8px', letterSpacing: '0.14em' }}>CV · PAGE 1</div>
    </div>)
}

function BPageAbout() {
  const d = LEV_DATA
  const a = d.about
  return (
    <BSpread section={{ full: 'About', num: '07', accent: 'teal', kicker: 'ABOUT · LEVI VANDENHEEDE', blurb: 'Who’s behind all this — and why it lives in one place.' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
        <div>
          <p style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 32, lineHeight: 1.35, margin: 0, color: B_COL.burgundy, textWrap: 'pretty' }}>
            "{a.pull}"
          </p>
          <div style={{ marginTop: 32, fontSize: 14, lineHeight: 1.75, color: B_COL.ink, columnCount: 2, columnGap: 28 }}>
            {a.paras.map((p, i) =>
              <p key={i} style={{ margin: i === a.paras.length - 1 ? 0 : '0 0 14px' }}>{p}</p>,
            )}
          </div>
          {/* CV — sits below the text, full left-column width */}
          <div style={{ marginTop: 36 }}>
            <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 8 }}>CURRICULUM VITAE</div>
            <BCvThumb src="/assets/levi-cv.pdf" accent="teal" />
            <a href="/assets/levi-cv.pdf" download="Levi Vandenheede — CV.pdf"
              style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: B_COL.burgundy, color: B_COL.cream, padding: '15px 22px', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = B_COL.ink }}
              onMouseLeave={(e) => { e.currentTarget.style.background = B_COL.burgundy }}>
              <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 22 }}>Download my CV</span>
              <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.gold, display: 'inline-flex', alignItems: 'center', gap: 8 }}>PDF · EN <span style={{ fontSize: 15 }}>↓</span></span>
            </a>
          </div>
        </div>
        <div>
          <BPhoto src="/assets/lev-sunset.jpg" ratio="4/5" accent="teal" label="LAKESHORE · SUNSET" style={{ marginBottom: 20 }} />
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 6 }}>SELECTED CREDITS</div>
          {a.credits.map(([k, v], i) =>
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${B_COL.rule}`, fontSize: 13 }}>
              <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 18 }}>{k}</span>
              <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute }}>{v}</span>
            </div>,
          )}
        </div>
      </div>

      {/* ── ON SET · BEHIND THE SCENES ── */}
      <div style={{ marginTop: 44, paddingTop: 36, borderTop: `1px solid ${B_COL.ink}`, display: 'grid', gridTemplateColumns: '248px 1fr', gap: 36, alignItems: 'center' }}>
        <div>
          <BLoopVideo src="/assets/directing-clip.mp4" ratio="9/16" tag="ON SET · DIRECTING" sound />
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginTop: 10, letterSpacing: '0.14em' }}>▸ TAP TO PLAY WITH SOUND</div>
        </div>
        <div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.teal, marginBottom: 10, letterSpacing: '0.14em' }}>BEHIND THE SCENES · FILM · 2025</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 44, lineHeight: 1.02 }}>On set</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.66, color: B_COL.ink, opacity: 0.86, marginTop: 14, maxWidth: 480, textWrap: 'pretty' }}>
            A short vertical cut from a recent shoot — directing, framing, and the usual controlled chaos. It's where most of the work on this site actually gets made: a small crew, a long day, and the same itch to find the best way to tell the story.
          </p>
        </div>
      </div>
    </BSpread>)
}

function BPageContact() {
  const d = LEV_DATA
  return (
    <BSpread section={{ full: 'Contact', num: '08', accent: 'gold', kicker: 'CONTACT · CORRESPONDENCE', blurb: 'For commissions, collaborations, interviews — or to just say hi.' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48 }}>
        <div>
          <p style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 28, lineHeight: 1.4, margin: 0, color: B_COL.ink, maxWidth: 480 }}>
            For commissions, collaborations, interviews, or to drop something in the postbox — write any time.
          </p>
          <div style={{ marginTop: 36, padding: 28, border: `1px solid ${B_COL.ink}`, background: B_COL.paper }}>
            <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.gold, marginBottom: 10 }}>WRITE TO</div>
            <a href={`mailto:${d.email}`} style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 34, color: B_COL.burgundy, textDecoration: 'none', borderBottom: `2px solid ${B_COL.gold}`, paddingBottom: 4, wordBreak: 'break-all' }}>{d.email}</a>
          </div>
          <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, marginTop: 22 }}>{d.location.toUpperCase()}</div>
        </div>
        <div>
          <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, marginBottom: 14 }}>ELSEWHERE ONLINE</div>
          {d.socials.map((s, i) =>
            <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderBottom: `1px solid ${B_COL.rule}`, textDecoration: 'none', color: B_COL.ink }}
              onMouseEnter={(e) => e.currentTarget.style.background = B_COL.paper}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <span style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 22 }}>{s.label}</span>
              <span style={{ ...bStyles.mono, fontSize: 10, color: B_COL.burgundy }}>{s.handle} ↗</span>
            </a>,
          )}
        </div>
      </div>
    </BSpread>)
}

export function VariationB() {
  const [page, setPage] = React.useState('home')
  const [fade, setFade] = React.useState(false)
  const goto = (p) => {
    if (p === page) return
    setFade(true)
    setTimeout(() => { setPage(p); setFade(false); document.querySelector('#b-scroll')?.scrollTo(0, 0) }, 220)
  }
  const pages = {
    home: <BPageHome setPage={goto} />,
    music: <BPageMusic />,
    journalism: <BPageJournalism />,
    comms: <BPageComms />,
    film: <BPageFilm />,
    freelance: <BPageFreelance />,
    abroad: <BPageAbroad />,
    about: <BPageAbout />,
    contact: <BPageContact />,
  }
  return (
    <div style={bStyles.root}>
      <BMast page={page} setPage={goto} />
      <div id="b-scroll" style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden', opacity: fade ? 0 : 1, transform: fade ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity .22s, transform .22s' }}>
        {pages[page]}
        <footer style={{ padding: '24px 32px', borderTop: `1px solid ${B_COL.ink}`, display: 'flex', justifyContent: 'space-between', ...bStyles.mono, fontSize: 10, color: B_COL.mute }}>
          <span>LEVCREATES · ISSUE I</span>
          <span>SET IN CORMORANT GARAMOND &amp; IBM PLEX MONO</span>
          <span>© MMXXV</span>
        </footer>
      </div>
    </div>)
}
