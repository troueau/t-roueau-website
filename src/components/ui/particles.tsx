import React, {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from "react"

import { cn } from "@/lib/utils"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  size?: number
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("")
  }
  const hexInt = parseInt(hex, 16)
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255]
}

type Circle = {
  x: number
  y: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  // lifecycle
  phase: "fadein" | "idle" | "fadeout"
  age: number
  maxAge: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 80,
  size = 0.6,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animateRef = useRef<() => void>(() => {})
  const initCanvasRef = useRef<() => void>(() => {})
  const rgbRef = useRef<number[]>(hexToRgb(color))

  rgbRef.current = hexToRgb(color)

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvasRef.current()
    animateRef.current()

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      resizeTimeout.current = setTimeout(() => initCanvasRef.current(), 200)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      if (rafID.current != null) window.cancelAnimationFrame(rafID.current)
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [color])

  const circleParams = (): Circle => {
    const w = canvasSize.current.w
    const h = canvasSize.current.h
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.5 + 0.1).toFixed(2)),
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      phase: "fadein",
      age: 0,
      maxAge: Math.floor(Math.random() * 300 + 200), // 200–500 frames alive
    }
  }

  initCanvasRef.current = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return

    canvasSize.current.w = canvasContainerRef.current.offsetWidth
    canvasSize.current.h = canvasContainerRef.current.offsetHeight

    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`
    context.current.scale(dpr, dpr)

    circles.current = Array.from({ length: quantity }, () => {
      const c = circleParams()
      // stagger initial ages so they don't all appear at once
      c.age = Math.floor(Math.random() * c.maxAge)
      c.phase = "idle"
      c.alpha = c.targetAlpha * Math.random()
      return c
    })
  }

  const drawCircle = (circle: Circle) => {
    if (!context.current) return
    const { x, y, size, alpha } = circle
    context.current.beginPath()
    context.current.arc(x, y, size, 0, 2 * Math.PI)
    context.current.fillStyle = `rgba(${rgbRef.current.join(", ")}, ${alpha})`
    context.current.fill()
  }

  const animate = () => {
    if (!context.current) return
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

    circles.current.forEach((circle, i) => {
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.age++

      // lifecycle
      if (circle.phase === "fadein") {
        circle.alpha = Math.min(circle.alpha + 0.008, circle.targetAlpha)
        if (circle.alpha >= circle.targetAlpha) circle.phase = "idle"
      } else if (circle.phase === "idle") {
        if (circle.age >= circle.maxAge) circle.phase = "fadeout"
      } else if (circle.phase === "fadeout") {
        circle.alpha = Math.max(circle.alpha - 0.008, 0)
        if (circle.alpha <= 0) {
          circles.current[i] = circleParams()
          return
        }
      }

      // wrap around edges instead of respawning abruptly
      const { w, h } = canvasSize.current
      if (circle.x < -circle.size) circle.x = w + circle.size
      if (circle.x > w + circle.size) circle.x = -circle.size
      if (circle.y < -circle.size) circle.y = h + circle.size
      if (circle.y > h + circle.size) circle.y = -circle.size

      drawCircle(circle)
    })

    rafID.current = window.requestAnimationFrame(animateRef.current)
  }

  animateRef.current = animate


  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
