import { useEffect, useState } from 'react';

/**
 * Types each word out, holds it, erases it, then moves to the next.
 * Returns the text to show right now. With `animate: false` it just returns
 * the first word, so reduced-motion visitors get a static line.
 */
export function useTypewriter(words, { animate = true, typeMs = 75, eraseMs = 35, holdMs = 1700, gapMs = 350 } = {}) {
    const [wordIndex, setWordIndex] = useState(0);
    const [length, setLength] = useState(animate ? 0 : words[0].length);
    const [erasing, setErasing] = useState(false);

    useEffect(() => {
        if (!animate) return undefined;

        const word = words[wordIndex];
        let delay;
        let next;

        if (!erasing && length < word.length) {
            // Small random jitter so it reads as typing, not a metronome
            delay = typeMs + Math.random() * 45;
            next = () => setLength(length + 1);
        } else if (!erasing) {
            delay = holdMs;
            next = () => setErasing(true);
        } else if (length > 0) {
            delay = eraseMs;
            next = () => setLength(length - 1);
        } else {
            delay = gapMs;
            next = () => {
                setErasing(false);
                setWordIndex((wordIndex + 1) % words.length);
            };
        }

        const timer = setTimeout(next, delay);
        return () => clearTimeout(timer);
    }, [animate, words, wordIndex, length, erasing, typeMs, eraseMs, holdMs, gapMs]);

    return words[wordIndex].slice(0, length);
}
