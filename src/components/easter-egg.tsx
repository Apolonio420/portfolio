"use client"

import { useEffect, useRef, useCallback, useState } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

const GREEN       = "#00ff41"
const DIM_GREEN   = "#003b00"
const BRIGHT      = "#39ff14"
const BLACK       = "#000000"

const CANVAS_W = () => window.innerWidth
const CANVAS_H = () => window.innerHeight

const KATAKANA = () => String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))

// ─── Types ────────────────────────────────────────────────────────────────────

interface RainDrop {
  x: number
  y: number
  speed: number
  opacity: number
  char: string
  charTimer: number
}

interface Bullet {
  x: number
  y: number
}

interface Enemy {
  x: number
  y: number
  char: string
  speed: number
  alive: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

interface GameState {
  playerX: number
  playerY: number
  bullets: Bullet[]
  enemies: Enemy[]
  particles: Particle[]
  rain: RainDrop[]
  score: number
  wave: number
  waveKills: number
  waveSize: number
  waveLabel: string
  waveLabelTimer: number
  keys: Set<string>
  shootCooldown: number
  lastTime: number
  running: boolean
}

// ─── Wake-up intro phase ───────────────────────────────────────────────────────

const WAKE_UP_TEXT = "Wake up..."

function WakeUpScreen({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Type out each character
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= WAKE_UP_TEXT.length) {
          clearInterval(interval)
          // After all chars visible, wait then fade out
          setTimeout(() => setDone(true), 1400)
          return c
        }
        return c + 1
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [done, onDone])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: BLACK,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: done ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(24px, 4vw, 48px)",
          color: GREEN,
          letterSpacing: "0.15em",
          textShadow: `0 0 8px ${GREEN}, 0 0 20px ${GREEN}`,
        }}
      >
        {WAKE_UP_TEXT.slice(0, visibleCount)}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: GREEN,
            marginLeft: "3px",
            verticalAlign: "middle",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      </span>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── Game ─────────────────────────────────────────────────────────────────────

function createRain(count: number, canvasW: number, canvasH: number): RainDrop[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    speed: 1.5 + Math.random() * 3,
    opacity: 0.05 + Math.random() * 0.5,
    char: KATAKANA(),
    charTimer: 0,
  }))
}

function spawnWave(wave: number, canvasW: number): Enemy[] {
  const count = 6 + wave * 2
  const speed = 0.3 + wave * 0.1
  const enemies: Enemy[] = []
  const cols = Math.min(count, 10)
  const spacing = canvasW / (cols + 1)
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    enemies.push({
      x: spacing * (col + 1),
      y: -60 - row * 60,
      char: KATAKANA(),
      speed: speed + Math.random() * 0.15,
      alive: true,
    })
  }
  return enemies
}

function MatrixGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState | null>(null)
  const rafRef = useRef<number>(0)
  const onExitRef = useRef(onExit)

  useEffect(() => { onExitRef.current = onExit }, [onExit])

  const initState = useCallback((): GameState => {
    const w = CANVAS_W()
    const h = CANVAS_H()
    const PLAYER_Y = h - 70
    return {
      playerX: w / 2,
      playerY: PLAYER_Y,
      bullets: [],
      enemies: spawnWave(1, w),
      particles: [],
      rain: createRain(120, w, h),
      score: 0,
      wave: 1,
      waveKills: 0,
      waveSize: 6 + 1 * 2,
      waveLabel: "WAVE 1",
      waveLabelTimer: 150,
      keys: new Set(),
      shootCooldown: 0,
      lastTime: performance.now(),
      running: true,
    }
  }, [])

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas: HTMLCanvasElement = canvasEl

    // Size canvas
    canvas.width = CANVAS_W()
    canvas.height = CANVAS_H()

    const state = initState()
    stateRef.current = state

    // ── Input ──────────────────────────────────────────────────────────────

    const onKeyDown = (e: KeyboardEvent) => {
      state.keys.add(e.code)
      if (e.code === "Escape") {
        state.running = false
        cancelAnimationFrame(rafRef.current)
        onExitRef.current()
      }
      // Prevent page scroll
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(e.code)) {
        e.preventDefault()
      }
    }
    const onKeyUp = (e: KeyboardEvent) => state.keys.delete(e.code)

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)

    // Resize
    const onResize = () => {
      canvas.width = CANVAS_W()
      canvas.height = CANVAS_H()
      state.playerY = CANVAS_H() - 70
      // Rebuild rain for new dimensions
      state.rain = createRain(120, CANVAS_W(), CANVAS_H())
    }
    window.addEventListener("resize", onResize)

    // ── Game loop ──────────────────────────────────────────────────────────

    const PLAYER_SPEED = 5
    const BULLET_SPEED = 10
    const PLAYER_SIZE  = 16 // half-width of ship base
    const BULLET_R     = 3
    const ENEMY_R      = 12

    function spawnExplosion(x: number, y: number) {
      const count = 10 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const speed = 1.5 + Math.random() * 3
        state.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 40 + Math.floor(Math.random() * 20),
          maxLife: 60,
        })
      }
    }

    function loop(now: number) {
      if (!state.running) return
      const dt = Math.min(now - state.lastTime, 50) // cap at 50ms
      state.lastTime = now

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const W = canvas.width
      const H = canvas.height

      // ── Update ──────────────────────────────────────────────────────────

      // Player movement
      if (state.keys.has("ArrowLeft") || state.keys.has("KeyA")) {
        state.playerX = Math.max(PLAYER_SIZE, state.playerX - PLAYER_SPEED)
      }
      if (state.keys.has("ArrowRight") || state.keys.has("KeyD")) {
        state.playerX = Math.min(W - PLAYER_SIZE, state.playerX + PLAYER_SPEED)
      }

      // Shoot
      if (state.shootCooldown > 0) state.shootCooldown--
      if (state.keys.has("Space") && state.shootCooldown === 0) {
        state.bullets.push({ x: state.playerX, y: state.playerY - PLAYER_SIZE - 4 })
        state.shootCooldown = 12
      }

      // Bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        state.bullets[i].y -= BULLET_SPEED
        if (state.bullets[i].y < -10) state.bullets.splice(i, 1)
      }

      // Enemies
      for (const enemy of state.enemies) {
        if (!enemy.alive) continue
        enemy.y += enemy.speed
        // Re-randomize char occasionally
        if (Math.random() < 0.005) enemy.char = KATAKANA()
      }

      // Collision: bullets vs enemies
      for (let bi = state.bullets.length - 1; bi >= 0; bi--) {
        const b = state.bullets[bi]
        let hit = false
        for (const enemy of state.enemies) {
          if (!enemy.alive) continue
          const dx = b.x - enemy.x
          const dy = b.y - enemy.y
          if (Math.abs(dx) < ENEMY_R + BULLET_R && Math.abs(dy) < ENEMY_R + BULLET_R) {
            enemy.alive = false
            spawnExplosion(enemy.x, enemy.y)
            state.score += 100
            state.waveKills++
            hit = true
            break
          }
        }
        if (hit) state.bullets.splice(bi, 1)
      }

      // Remove off-screen enemies
      state.enemies = state.enemies.filter(e => e.alive && e.y < H + 20)

      // Next wave if all dead or all off-screen
      const aliveCount = state.enemies.filter(e => e.alive).length
      if (aliveCount === 0) {
        state.wave++
        const waveSize = 6 + state.wave * 2
        state.enemies = spawnWave(state.wave, W)
        state.waveSize = waveSize
        state.waveLabel = `WAVE ${state.wave}`
        state.waveLabelTimer = 150
      }

      if (state.waveLabelTimer > 0) state.waveLabelTimer--

      // Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // slight gravity
        p.vx *= 0.97
        p.life--
        if (p.life <= 0) state.particles.splice(i, 1)
      }

      // Rain
      for (const drop of state.rain) {
        drop.y += drop.speed
        drop.charTimer++
        if (drop.charTimer > 8) {
          drop.char = KATAKANA()
          drop.charTimer = 0
        }
        if (drop.y > H + 20) {
          drop.y = -10
          drop.x = Math.random() * W
          drop.opacity = 0.05 + Math.random() * 0.5
          drop.speed = 1.5 + Math.random() * 3
        }
      }

      // ── Draw ────────────────────────────────────────────────────────────

      // Clear
      ctx.fillStyle = BLACK
      ctx.fillRect(0, 0, W, H)

      // Rain
      ctx.font = "14px monospace"
      for (const drop of state.rain) {
        ctx.globalAlpha = drop.opacity
        ctx.fillStyle = DIM_GREEN
        ctx.fillText(drop.char, drop.x, drop.y)
      }
      ctx.globalAlpha = 1

      // Enemies
      ctx.font = "bold 18px monospace"
      for (const enemy of state.enemies) {
        if (!enemy.alive) continue
        ctx.fillStyle = GREEN
        ctx.shadowColor = GREEN
        ctx.shadowBlur = 8
        ctx.fillText(enemy.char, enemy.x - 9, enemy.y + 7)
        ctx.shadowBlur = 0
      }

      // Bullets
      ctx.fillStyle = BRIGHT
      ctx.shadowColor = BRIGHT
      ctx.shadowBlur = 6
      for (const b of state.bullets) {
        ctx.beginPath()
        ctx.arc(b.x, b.y, BULLET_R, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Particles
      for (const p of state.particles) {
        const t = p.life / p.maxLife
        ctx.globalAlpha = t * 0.9
        ctx.fillStyle = t > 0.5 ? BRIGHT : GREEN
        ctx.shadowColor = GREEN
        ctx.shadowBlur = 4
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4)
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      // Player ship (triangle)
      ctx.beginPath()
      ctx.moveTo(state.playerX, state.playerY - PLAYER_SIZE - 2)
      ctx.lineTo(state.playerX - PLAYER_SIZE, state.playerY + PLAYER_SIZE * 0.5)
      ctx.lineTo(state.playerX + PLAYER_SIZE, state.playerY + PLAYER_SIZE * 0.5)
      ctx.closePath()
      ctx.fillStyle = GREEN
      ctx.shadowColor = GREEN
      ctx.shadowBlur = 14
      ctx.fill()
      ctx.shadowBlur = 0

      // Thruster glow
      ctx.beginPath()
      ctx.moveTo(state.playerX - 6, state.playerY + PLAYER_SIZE * 0.5)
      ctx.lineTo(state.playerX + 6, state.playerY + PLAYER_SIZE * 0.5)
      ctx.lineTo(state.playerX, state.playerY + PLAYER_SIZE * 0.5 + 8 + Math.random() * 5)
      ctx.closePath()
      ctx.fillStyle = BRIGHT
      ctx.globalAlpha = 0.7
      ctx.fill()
      ctx.globalAlpha = 1

      // HUD — score
      ctx.font = "bold 14px monospace"
      ctx.fillStyle = GREEN
      ctx.shadowColor = GREEN
      ctx.shadowBlur = 6
      ctx.textAlign = "right"
      ctx.fillText(`SCORE: ${state.score}`, W - 20, 30)
      ctx.textAlign = "left"
      ctx.shadowBlur = 0

      // HUD — wave (top-left area after ESC hint)
      ctx.font = "12px monospace"
      ctx.fillStyle = GREEN
      ctx.fillText(`WAVE: ${state.wave}`, 20, 50)

      // ESC hint
      ctx.fillStyle = DIM_GREEN
      ctx.shadowColor = DIM_GREEN
      ctx.shadowBlur = 4
      ctx.font = "12px monospace"
      ctx.fillText("[ ESC ] exit", 20, 26)
      ctx.shadowBlur = 0

      // Wave label flash
      if (state.waveLabelTimer > 0) {
        const alpha = Math.min(1, state.waveLabelTimer / 30)
        ctx.globalAlpha = alpha
        ctx.font = "bold clamp(24px, 4vw, 40px) monospace"
        ctx.fillStyle = BRIGHT
        ctx.shadowColor = BRIGHT
        ctx.shadowBlur = 20
        ctx.textAlign = "center"
        ctx.fillText(state.waveLabel, W / 2, H / 2)
        ctx.textAlign = "left"
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      state.running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("resize", onResize)
    }
  }, [initState])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: BLACK,
        overflow: "hidden",
        cursor: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

type Phase = "idle" | "wakeup" | "game"

export default function EasterEgg() {
  const [phase, setPhase] = useState<Phase>("idle")
  const konamiRef = useRef<string[]>([])

  const trigger = useCallback(() => {
    setPhase((p) => (p === "idle" ? "wakeup" : p))
  }, [])

  // Konami code detection
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key === " " ? "Space" : e.key)
      if (konamiRef.current.length > KONAMI.length) {
        konamiRef.current.shift()
      }
      if (
        konamiRef.current.length === KONAMI.length &&
        konamiRef.current.every((k, i) => k === KONAMI[i])
      ) {
        konamiRef.current = []
        trigger()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [trigger])

  // Custom event: triggerMatrix
  useEffect(() => {
    const onMatrix = () => trigger()
    window.addEventListener("triggerMatrix", onMatrix)
    return () => window.removeEventListener("triggerMatrix", onMatrix)
  }, [trigger])

  const handleWakeUpDone = useCallback(() => setPhase("game"), [])
  const handleExit = useCallback(() => setPhase("idle"), [])

  if (phase === "idle") return null

  if (phase === "wakeup") {
    return <WakeUpScreen onDone={handleWakeUpDone} />
  }

  return <MatrixGame onExit={handleExit} />
}
