import { useEffect, useState, RefObject } from 'react';

interface UseInViewOptions extends Omit<IntersectionObserverInit, 'threshold'> {
  once?: boolean;
  amount?: number | number[];
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: UseInViewOptions
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const { once, amount, ...observerOptions } = options || {};
    const threshold = amount;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) {
          observer.disconnect();
        }
      } else if (!once) {
        setIsInView(false);
      }
    }, { ...observerOptions, threshold });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}

