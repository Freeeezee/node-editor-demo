'use client'

import {useCallback, useEffect, useRef, useState} from "react";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import {nodeCreatorRegistry} from "@/app/lib/constants/node-registry";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";

interface NodeSearchDialogProps {
    open: boolean;
    onClose: () => void;
}

const ALL_NODES = Object.entries(nodeCreatorRegistry);

function filterNodes(query: string) {
    const q = query.toLowerCase();
    return ALL_NODES.filter(([, {label}]) => label.toLowerCase().includes(q));
}

export default function NodeSearchDialog({open, onClose}: NodeSearchDialogProps) {
    const [query, setQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);
    const addNode = useNodeEditorStore(s => s.addNode);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = filterNodes(query);
    const clampedIndex = Math.min(focusedIndex, Math.max(0, filtered.length - 1));

    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => inputRef.current?.focus(), 150);
        return () => clearTimeout(id);
    }, [open]);

    const handleOpen = () => {
        setQuery('');
        setFocusedIndex(0);
    };

    const selectNode = useCallback((type: string) => {
        addNode(type);
        onClose();
    }, [addNode, onClose]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[clampedIndex]) {
            e.preventDefault();
            selectNode(filtered[clampedIndex][0]);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            transitionDuration={120}
            slotProps={{
                transition: {onEnter: handleOpen},
                paper: {className: 'w-[420px] max-h-[480px] rounded-lg overflow-hidden !bg-none'},
            }}
        >
            <div className="flex items-center px-4 py-3 gap-3">
                <SearchIcon className="text-gray-400 shrink-0" />
                <InputBase
                    inputRef={inputRef}
                    fullWidth
                    placeholder="Search nodes…"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        setFocusedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    className="text-sm"
                />
            </div>
            <hr className="border-gray-200" />
            <List disablePadding className="max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-400">No nodes found</p>
                ) : filtered.map(([type, {label}], i) => (
                    <ListItemButton
                        key={type}
                        selected={i === clampedIndex}
                        onClick={() => selectNode(type)}
                        onMouseMove={() => setFocusedIndex(i)}
                        className="px-4 py-2.5"
                    >
                        <ListItemText
                            primary={label}
                            slotProps={{
                                primary: {className: i === clampedIndex ? 'font-semibold' : ''},
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Dialog>
    );
}
