import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';

/**
 * Geographic-style topographic contour lines drawn on a canvas.
 * Lines sit still; moving the cursor pushes nearby contours outward,
 * and they spring back to their resting position once the mouse settles.
 */
export function TopoLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    // ── Value noise ────────────────────────────────────────────
    const permSize = 512;
    const perm = new Float32Array(permSize);
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let i = 0; i < permSize; i++) perm[i] = rand();
    const latticeVal = (ix: number, iy: number) => {
      const h = ((ix * 73856093) ^ (iy * 19349663)) >>> 0;
      return perm[h % permSize];
    };
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const noise = (x: number, y: number) => {
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const fx = smooth(x - x0);
      const fy = smooth(y - y0);
      const v00 = latticeVal(x0, y0);
      const v10 = latticeVal(x0 + 1, y0);
      const v01 = latticeVal(x0, y0 + 1);
      const v11 = latticeVal(x0 + 1, y0 + 1);
      const a = v00 + (v10 - v00) * fx;
      const b = v01 + (v11 - v01) * fx;
      return a + (b - a) * fy;
    };
    const fbm = (x: number, y: number) =>
      0.62 * noise(x, y) + 0.30 * noise(x * 2.1, y * 2.1) + 0.08 * noise(x * 4.3, y * 4.3);

    // ── Grid / field ───────────────────────────────────────────
    const cell = 26;
    let cols = 0;
    let rows = 0;
    let base: Float32Array = new Float32Array(0);
    let width = 0;
    let height = 0;
    const freq = 0.0019;

    const buildBase = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      base = new Float32Array((cols + 1) * (rows + 1));
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          base[j * (cols + 1) + i] = fbm(i * cell * freq + 100, j * cell * freq + 100);
        }
      }
    };

    // ── Mouse bump (decays → spring back) ──────────────────────
    const mouse = { x: -9999, y: -9999 };
    let influence = 0;
    const bumpRadius = 150;
    const bumpRadiusSq2 = 2 * bumpRadius * bumpRadius;

    const lineColor = () =>
      actualTheme === 'dark'
        ? 'rgba(220, 222, 235, 0.16)'
        : 'rgba(40, 42, 70, 0.16)';
    const accentColor = () =>
      actualTheme === 'dark'
        ? 'rgba(120, 130, 255, 0.5)'
        : 'rgba(40, 50, 230, 0.42)';

    const levels: number[] = [];
    for (let l = 0.16; l <= 0.86; l += 0.07) levels.push(l);

    // Linear interpolation point on a cell edge between two corners
    const lerp = (p1: number, p2: number, v1: number, v2: number, iso: number) => {
      const t = (iso - v1) / (v2 - v1);
      return p1 + (p2 - p1) * t;
    };

    const fieldAt = (i: number, j: number, px: number, py: number) => {
      let v = base[j * (cols + 1) + i];
      if (influence > 0.001) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        v += influence * Math.exp(-(dx * dx + dy * dy) / bumpRadiusSq2);
      }
      return v;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const near = influence > 0.02;
      ctx.lineWidth = 1;

      for (const iso of levels) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const x0 = i * cell;
            const y0 = j * cell;
            const x1 = x0 + cell;
            const y1 = y0 + cell;

            const tl = fieldAt(i, j, x0, y0);
            const tr = fieldAt(i + 1, j, x1, y0);
            const br = fieldAt(i + 1, j + 1, x1, y1);
            const bl = fieldAt(i, j + 1, x0, y1);

            let idx = 0;
            if (tl > iso) idx |= 8;
            if (tr > iso) idx |= 4;
            if (br > iso) idx |= 2;
            if (bl > iso) idx |= 1;
            if (idx === 0 || idx === 15) continue;

            // Edge midpoints via interpolation
            const top = () => [lerp(x0, x1, tl, tr, iso), y0] as const;
            const right = () => [x1, lerp(y0, y1, tr, br, iso)] as const;
            const bottom = () => [lerp(x0, x1, bl, br, iso), y1] as const;
            const left = () => [x0, lerp(y0, y1, tl, bl, iso)] as const;

            const seg = (a: readonly [number, number], b: readonly [number, number]) => {
              ctx.moveTo(a[0], a[1]);
              ctx.lineTo(b[0], b[1]);
            };

            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 10: seg(left(), bottom()); seg(top(), right()); break;
            }
          }
        }
        ctx.strokeStyle = near ? accentColor() : lineColor();
        ctx.globalAlpha = near ? Math.min(1, 0.4 + influence * 3) : 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    // ── Animation loop (idle-aware) ────────────────────────────
    let rafId = 0;
    let running = false;
    const tick = () => {
      influence *= 0.92;
      draw();
      if (influence > 0.002 && !reducedMotion) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        draw(); // settled frame
      }
    };
    const ensureRunning = () => {
      if (!running && !reducedMotion) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (mouse.x < -50 || mouse.x > width + 50 || mouse.y < -50 || mouse.y > height + 50) return;
      influence = 0.16;
      ensureRunning();
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildBase();
        draw();
      }, 150);
    };

    buildBase();
    draw();
    if (!isCoarse) window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [actualTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
