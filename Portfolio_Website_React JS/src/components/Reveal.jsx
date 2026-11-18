import React, { useEffect, useRef, useState } from 'react';

const canObserve =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Without IntersectionObserver (or with reduced motion) it renders visible at once.
 */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(!canObserve);

    useEffect(() => {
        if (visible) return undefined;
        const el = ref.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [visible]);

    return (
        <Tag
            ref={ref}
            className={`reveal-on-scroll${visible ? ' is-visible' : ''} ${className}`.trim()}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
            {...rest}
        >
            {children}
        </Tag>
    );
}

export default Reveal;
