import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

/**
 * Subtle interactive particle field rendered behind the hero.
 * Particles drift slowly and react to mouse movement with gentle parallax.
 */
export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Particle setup — mostly muted ink dots, a few electric blue
    const count = isMobile ? 350 : 1100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const inkColor = actualTheme === 'dark'
      ? new THREE.Color(0.75, 0.75, 0.78)
      : new THREE.Color(0.25, 0.25, 0.3);
    const blueColor = actualTheme === 'dark'
      ? new THREE.Color(0.45, 0.5, 1.0)
      : new THREE.Color(0.18, 0.2, 0.95);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const color = Math.random() < 0.12 ? blueColor : inkColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: actualTheme === 'dark' ? 0.55 : 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!isMobile) window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const startTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      if (!prefersReducedMotion) {
        points.rotation.y = elapsed * 0.02;
        targetRotation.x += (mouse.y * 0.12 - targetRotation.x) * 0.04;
        targetRotation.y += (mouse.x * 0.12 - targetRotation.y) * 0.04;
        points.rotation.x = targetRotation.x;
        points.rotation.z = targetRotation.y * 0.5;
        camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [actualTheme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
