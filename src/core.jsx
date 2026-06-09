// Variation B — "Editorial Index"
// Magazine spread vibe. Cream + burgundy + ink, with gold + teal accents.
import React from 'react'
import { LEV_DATA } from './data.js'

// Design defaults (the direction the user landed on in the design tool:
// burgundy palette, split "Lev. creates" headline, drop cap on, sepia film
// treatment). These were live toggles in the prototype's Tweaks panel; baked
// in here as the production look.
export const TWEAKS = {
  palette: 'burgundy',
  coverWord: 'split',
  showDropCap: true,
  imageFilter: 'sepia',
}

export const B_COL = {
  ink: '#1a1110',
  burgundy: '#5c0a14',
  red: '#8a1c2b',
  cream: '#f3ede0',
  paper: '#ebe3d2',
  rust: '#c98a72',
  gold: '#b07d1e', // warm accent
  teal: '#1f6f66', // cool accent
  mute: '#7a6a5c',
  rule: 'rgba(26,17,16,0.18)',
}

// Resolve a section's accent key to a live hex.
export function accentHex(key) {
  return {
    gold: B_COL.gold, teal: B_COL.teal, burgundy: B_COL.burgundy,
    red: B_COL.red, rust: B_COL.rust,
  }[key] || B_COL.burgundy
}

export const bStyles = {
  root: {
    width: '100%', height: '100%',
    background: B_COL.cream,
    color: B_COL.ink,
    fontFamily: '"Manrope", "Söhne", -apple-system, system-ui, sans-serif',
    position: 'relative', overflow: 'hidden',
  },
  display: { fontFamily: '"Cormorant Garamond", "EB Garamond", Georgia, serif', fontWeight: 500, letterSpacing: '-0.01em' },
  mono: { fontFamily: '"IBM Plex Mono", ui-monospace, monospace', letterSpacing: '0.08em', textTransform: 'uppercase' },
}

// Nav model built from the data sections + fixed about/contact.
export function buildNav() {
  const d = LEV_DATA
  const secs = d.sections.map((s) => ({ id: s.id, label: s.nav, num: s.num, accent: s.accent }))
  return [
    { id: 'home', label: 'Cover', num: '00', accent: 'burgundy' },
    ...secs,
    { id: 'about', label: 'About', num: '07', accent: 'teal' },
    { id: 'contact', label: 'Contact', num: '08', accent: 'gold' }]
}

// ---- Image film treatment ----
export function imgFilter() {
  const tw = TWEAKS
  return tw.imageFilter === 'none' ? 'none' :
    tw.imageFilter === 'desaturate' ? 'saturate(0.45) brightness(0.95) contrast(1.05)' :
      tw.imageFilter === 'mono' ? 'grayscale(1) contrast(1.08) brightness(0.95)' :
        'sepia(0.32) saturate(0.85) contrast(1.04) brightness(0.92)'
}

export function BTrimmedVideo({ src, trimStart = 1, trimEnd = 1, aspect = '2 / 1', tag }) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    const v = ref.current; if (!v) return
    v.muted = true
    let end = Infinity
    const onMeta = () => {
      end = Math.max(trimStart + 0.1, (v.duration || 0) - trimEnd)
      try { v.currentTime = trimStart } catch (e) {}
      v.play().catch(() => {})
    }
    const onTime = () => {
      if (v.currentTime >= end) { try { v.currentTime = trimStart } catch (e) {} v.play().catch(() => {}) }
    }
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('timeupdate', onTime)
    if (v.readyState >= 1) onMeta()
    return () => { v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('timeupdate', onTime) }
  }, [src, trimStart, trimEnd])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 260, overflow: 'hidden', background: '#000' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden' }}>
          <video ref={ref} src={src} autoPlay playsInline preload="auto"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block' }} />
        </div>
      </div>
      {tag &&
        <div style={{ position: 'absolute', top: 14, left: 14, ...bStyles.mono, fontSize: 9, color: B_COL.gold, letterSpacing: '0.16em', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{tag}</div>
      }
    </div>)
}

// Click-to-play teaser video: sound on, starts at a given second, bottom-cropped.
export function BTeaserVideo({ src, startAt = 9, trimEnd = 1, tag, aspect = '2 / 1' }) {
  const ref = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  React.useEffect(() => {
    const v = ref.current; if (!v) return
    const onMeta = () => { try { v.currentTime = startAt } catch (e) {} }
    const onTime = () => {
      const end = Math.max(startAt + 0.1, (v.duration || 0) - trimEnd)
      if (v.currentTime >= end) { v.pause(); try { v.currentTime = startAt } catch (e) {} setPlaying(false) }
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    if (v.readyState >= 1) onMeta()
    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [src, startAt, trimEnd])
  const toggle = (e) => {
    e.preventDefault()
    const v = ref.current; if (!v) return
    if (v.paused) { v.muted = false; if (v.currentTime < startAt) { try { v.currentTime = startAt } catch (er) {} } v.play().catch(() => {}) }
    else { v.pause() }
  }
  return (
    <div onClick={toggle} style={{ position: 'relative', width: '100%', height: '100%', minHeight: 260, overflow: 'hidden', background: '#000', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden' }}>
          <video ref={ref} src={src} playsInline preload="metadata" style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block' }} />
        </div>
      </div>
      {tag &&
        <div style={{ position: 'absolute', top: 14, left: 14, ...bStyles.mono, fontSize: 9, color: B_COL.gold, letterSpacing: '0.16em', textShadow: '0 1px 6px rgba(0,0,0,0.6)', pointerEvents: 'none' }}>{tag}</div>
      }
      {!playing &&
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,17,16,0.28)', pointerEvents: 'none' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: B_COL.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.45)' }}>
            <div style={{ width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: `20px solid ${B_COL.ink}`, marginLeft: 6 }} />
          </div>
        </div>
      }
    </div>)
}

export function BPhoto({ src, label, ratio = '4/3', accent = 'burgundy', style = {} }) {
  const ac = accentHex(accent)
  if (src) {
    return (
      <div style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden', background: B_COL.ink, border: `1px solid ${B_COL.ink}`, ...style }}>
        <img src={src} alt={label || ''} style={{ width: '100%', height: '100%', filter: imgFilter(), objectFit: 'cover' }} />
      </div>)
  }
  // Striped placeholder — for sections still awaiting a real photo.
  return (
    <div style={{
      position: 'relative', aspectRatio: ratio, overflow: 'hidden',
      border: `1px solid ${B_COL.rule}`,
      background: `repeating-linear-gradient(45deg, ${B_COL.paper}, ${B_COL.paper} 10px, ${B_COL.cream} 10px, ${B_COL.cream} 20px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, letterSpacing: '0.16em', textAlign: 'center', padding: 8 }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: ac, marginRight: 8, verticalAlign: 'middle' }} />
        {label || 'DROP PHOTO'}
      </div>
    </div>)
}

export function BMast({ page, setPage }) {
  const NAV = buildNav()
  return (
    <header style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      borderBottom: `1px solid ${B_COL.ink}`,
      background: B_COL.cream,
      display: 'flex', alignItems: 'stretch',
    }}>
      <div style={{
        padding: '16px 22px',
        borderRight: `1px solid ${B_COL.ink}`,
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer', flex: '0 0 auto', minWidth: 0,
      }} onClick={() => setPage('home')}>
        <div style={{ width: 26, height: 26, background: B_COL.burgundy, borderRadius: '50%', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: B_COL.gold }} />
        </div>
        <div style={{ paddingRight: 4 }}>
          <div style={{ ...bStyles.display, fontSize: 21, lineHeight: 0.95, color: B_COL.burgundy, fontStyle: 'italic', whiteSpace: 'nowrap' }}>Levcreates</div>
          <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.mute, marginTop: 2 }}>MMXXV</div>
        </div>
      </div>
      <nav style={{ flex: '1 1 0', minWidth: 0, display: 'flex' }}>
        {NAV.slice(1).map((n, i, arr) => {
          const active = page === n.id
          const ac = accentHex(n.accent)
          return (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{
                flex: '1 1 0', minWidth: 0,
                background: active ? B_COL.ink : 'transparent',
                color: active ? B_COL.cream : B_COL.ink,
                borderRight: i < arr.length - 1 ? `1px solid ${B_COL.ink}` : 'none',
                borderTop: active ? `3px solid ${ac}` : '3px solid transparent',
                borderLeft: 'none',
                borderBottom: 'none',
                cursor: 'pointer', padding: '12px 8px', textAlign: 'left',
                transition: 'background .2s, color .2s', overflow: 'hidden',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = B_COL.paper }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ ...bStyles.mono, fontSize: 8, color: active ? ac : B_COL.mute, opacity: active ? 1 : 0.8 }}>{n.num}</div>
              <div style={{ ...bStyles.display, fontSize: 17, fontStyle: 'italic', lineHeight: 1, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.label}</div>
            </button>)
        })}
      </nav>
    </header>)
}

// Reused on film grids.
export function BVideoThumb({ id, title, kind, year, dur, small, onClick }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ cursor: onClick ? 'pointer' : 'default', position: 'relative' }}>
      <div style={{ position: 'relative', aspectRatio: small ? '4/3' : '16/9', overflow: 'hidden', background: B_COL.ink, border: `1px solid ${B_COL.ink}` }}>
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg` }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hover ? 'none' : imgFilter(), transition: 'filter .4s, transform .6s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: hover ? 'rgba(92,10,20,0.12)' : 'rgba(92,10,20,0.28)', transition: 'background .3s' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, ...bStyles.mono, fontSize: 9, color: B_COL.cream, background: B_COL.burgundy, padding: '3px 7px' }}>{dur}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, gap: 12 }}>
        <div>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.red, marginBottom: 4 }}>{kind} · {year}</div>
          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: small ? 20 : 26, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ ...bStyles.mono, fontSize: 10, opacity: hover ? 1 : 0.5, transition: 'opacity .2s' }}>→</div>
      </div>
    </div>)
}

export function BPageHome({ setPage }) {
  const d = LEV_DATA
  const tw = TWEAKS
  const dropCap = tw.showDropCap !== false
  const single = tw.coverWord === 'single'

  return (
    <>
      {/* Cover spread — left: intro copy. right: portrait. */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', minHeight: 560 }}>
        <div style={{ padding: '56px 48px 40px', borderRight: `1px solid ${B_COL.ink}`, position: 'relative' }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.mute, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, letterSpacing: '0.18em' }}>
            <span style={{ width: 22, height: 1, background: B_COL.gold }} />
            A WORKING ARCHIVE — MMXXV
          </div>

          <h1 style={{ ...bStyles.display, fontSize: single ? 110 : 168, lineHeight: 0.86, margin: 0, color: B_COL.ink, letterSpacing: '-0.04em' }}>
            {single ? <>Levcreates<span style={{ color: B_COL.gold }}>.</span></> : <>Lev<span style={{ color: B_COL.gold }}>.</span></>}
          </h1>
          {!single &&
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 58, lineHeight: 0.95, color: B_COL.burgundy, marginTop: 4 }}>creates</div>
          }

          <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 30, color: B_COL.teal, marginTop: 24, lineHeight: 1.1 }}>
            {d.intro.lead}
          </div>

          <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.58, color: B_COL.ink, maxWidth: 470, textWrap: 'pretty' }}>
            {dropCap &&
              <span style={{ ...bStyles.display, fontSize: 60, lineHeight: 0.7, float: 'left', marginRight: 10, marginTop: 6, color: B_COL.burgundy, fontStyle: 'italic' }}>
                {d.intro.body.charAt(0)}
              </span>
            }
            {dropCap ? d.intro.body.slice(1) : d.intro.body}
          </p>
          <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.58, color: B_COL.ink, maxWidth: 470, textWrap: 'pretty' }}>
            {d.intro.body2}
          </p>

          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setPage('music')} style={{ ...bStyles.mono, fontSize: 10, color: B_COL.cream, background: B_COL.burgundy, border: 'none', padding: '11px 16px', cursor: 'pointer' }}>START WITH MUSIC →</button>
            <button onClick={() => setPage('about')} style={{ ...bStyles.mono, fontSize: 10, color: B_COL.ink, background: 'transparent', border: `1px solid ${B_COL.ink}`, padding: '11px 16px', cursor: 'pointer' }}>MORE ABOUT ME</button>
          </div>
        </div>

        {/* Right: portrait + a second slot */}
        <div style={{ padding: '28px', background: B_COL.ink, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...bStyles.mono, fontSize: 9, color: B_COL.gold, letterSpacing: '0.2em' }}>LEVI VANDENHEEDE · {d.location.toUpperCase()}</div>
          <BPhoto src="/assets/lev-portrait.jpg" ratio="4/3" label="PORTRAIT" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, alignItems: 'stretch' }}>
            <div style={{ position: 'relative' }}>
              <BPhoto src="/assets/directing.jpg" ratio="3/2" accent="teal" label="DIRECTING" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, ...bStyles.mono, fontSize: 8, color: B_COL.cream, background: B_COL.teal, padding: '4px 8px', letterSpacing: '0.12em' }}>ON SET · DIRECTING</div>
            </div>
            <div style={{ background: B_COL.burgundy, color: B_COL.cream, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ ...bStyles.mono, fontSize: 8, color: B_COL.gold }}>EST.</div>
              <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 26, lineHeight: 1.05 }}>Stories, any way I can tell them.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentary feature band */}
      <div style={{ borderTop: `1px solid ${B_COL.ink}`, background: B_COL.ink, color: B_COL.cream }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', minHeight: 300 }}>
          <div style={{ position: 'relative', borderRight: `1px solid ${B_COL.cream}22`, overflow: 'hidden', background: '#000' }}>
            <BTeaserVideo src="/assets/teaser.mp4" startAt={9} trimEnd={1} aspect="2 / 1" tag="OFFICIAL TEASER · VTM" />
            <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', ...bStyles.mono, fontSize: 8, color: B_COL.cream, opacity: 0.7, letterSpacing: '0.12em', pointerEvents: 'none' }}>
              <span>TELEFACTS NU</span><span>RODE NEUZEN DAG · 2020</span>
            </div>
          </div>
          <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.gold, letterSpacing: '0.18em', marginBottom: 16 }}>{d.docu.kicker}</div>
            <div style={{ ...bStyles.display, fontStyle: 'italic', fontSize: 56, lineHeight: 1, marginBottom: 16 }}>{d.docu.title}</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, opacity: 0.85, maxWidth: 460, margin: 0 }}>{d.docu.desc}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <a href={d.docu.teaserUrl} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 10, color: B_COL.ink, background: B_COL.gold, padding: '12px 18px', textDecoration: 'none' }}>{d.docu.cta} ↗</a>
              <a href={d.docu.url} target="_blank" rel="noreferrer" style={{ ...bStyles.mono, fontSize: 10, color: B_COL.cream, background: 'transparent', border: `1px solid ${B_COL.cream}55`, padding: '12px 18px', textDecoration: 'none' }}>{d.docu.cta2} ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* Index strip */}
      <div style={{ padding: '44px 48px 36px', borderTop: `1px solid ${B_COL.ink}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <h2 style={{ ...bStyles.display, fontSize: 40, margin: 0, fontStyle: 'italic' }}>Contents</h2>
          <div style={{ ...bStyles.mono, fontSize: 10, color: B_COL.mute, letterSpacing: '0.2em' }}>§01 → §06</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {d.sections.map((s) => {
            const ac = accentHex(s.accent)
            return (
              <button key={s.id} onClick={() => setPage(s.id)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '16px 18px', borderLeft: `3px solid ${ac}`, transition: 'background .2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = B_COL.paper}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{ ...bStyles.mono, fontSize: 10, color: ac, letterSpacing: '0.16em' }}>§{s.num}</div>
                <div style={{ ...bStyles.display, fontSize: 26, fontStyle: 'italic', marginTop: 6, lineHeight: 1.05 }}>{s.full}</div>
              </button>)
          })}
        </div>
      </div>
    </>)
}
