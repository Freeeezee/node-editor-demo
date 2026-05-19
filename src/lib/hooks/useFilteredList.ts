import {useState} from "react";

export function useFilteredList<T>(
    items: T[],
    filter: (item: T, query: string) => boolean,
) {
    const [query, setQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);

    const filtered = query ? items.filter(item => filter(item, query)) : items;
    const clampedIndex = Math.min(focusedIndex, Math.max(0, filtered.length - 1));

    const reset = () => {
        setQuery('');
        setFocusedIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent, onSelect: (item: T) => void) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[clampedIndex]) {
            e.preventDefault();
            onSelect(filtered[clampedIndex]);
        }
    };

    return {
        query,
        setQuery: (q: string) => { setQuery(q); setFocusedIndex(0); },
        filtered,
        focusedIndex: clampedIndex,
        setFocusedIndex,
        reset,
        handleKeyDown,
    };
}
