import { useState, useCallback } from 'react';

export function useLoading(initial = false) {
    const [loading, setLoading] = useState(initial);

    const start = useCallback(() => setLoading(true), []);
    const stop = useCallback(() => setLoading(false), []);

    return { loading, start, stop };
}