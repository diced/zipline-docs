'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import styles from './home-motion.module.css';

const REVEALS = {
  text: { offset: 8, duration: 1400 },
  image: { offset: 14, duration: 1600 },
};
const REVEAL_INSET = 48;

function observeReveals(root: HTMLElement) {
  if (!('IntersectionObserver' in window) || !root.animate) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');
  const revealed = new WeakSet<HTMLElement>();
  const animations = new Map<HTMLElement, Animation>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    },
    { rootMargin: `0px 0px -${REVEAL_INSET}px 0px`, threshold: 0 },
  );

  function reveal(element: HTMLElement, animate = true) {
    observer.unobserve(element);
    element.classList.remove(styles.pending);
    animations.get(element)?.cancel();
    animations.delete(element);
    if (revealed.has(element)) return;

    revealed.add(element);
    if (!animate || motion.matches) return;

    const { offset, duration } = REVEALS[element.dataset.reveal === 'image' ? 'image' : 'text'];
    const animation = element.animate(
      [
        { opacity: 0, transform: `translate3d(0, ${offset}px, 0)` },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration,
        delay: Math.max(0, Number(element.dataset.revealDelay) || 0),
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill: 'backwards',
      },
    );
    animations.set(element, animation);
    const clear = () => {
      if (animations.get(element) === animation) animations.delete(element);
    };
    animation.addEventListener('finish', clear, { once: true });
    animation.addEventListener('cancel', clear, { once: true });
  }

  function start(animateVisible = false) {
    if (motion.matches) return;

    for (const element of elements) {
      if (revealed.has(element)) continue;
      const { top, bottom } = element.getBoundingClientRect();
      const offscreen = top >= window.innerHeight - REVEAL_INSET;
      if (bottom <= 0 || (!animateVisible && !offscreen)) {
        reveal(element, false);
        continue;
      }
      // Only hide offscreen content, so the page stays readable before hydration.
      if (offscreen) element.classList.add(styles.pending);
      observer.observe(element);
    }
  }

  function reset() {
    observer.disconnect();
    for (const element of elements) element.classList.remove(styles.pending);
    for (const animation of animations.values()) animation.cancel();
    animations.clear();
  }

  function onFocus(event: FocusEvent) {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>('[data-reveal]');
    if (element) reveal(element, false);
  }

  function onMotionChange() {
    reset();
    start();
  }

  root.addEventListener('focusin', onFocus);
  motion.addEventListener('change', onMotionChange);
  start(true);
  return () => {
    reset();
    root.removeEventListener('focusin', onFocus);
    motion.removeEventListener('change', onMotionChange);
  };
}

export function HomeMotion({ children, ...props }: ComponentPropsWithoutRef<'main'>) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root) return observeReveals(root);
  }, []);

  return (
    <main ref={rootRef} {...props}>
      {children}
    </main>
  );
}
