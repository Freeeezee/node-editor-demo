
import {useCallback, useEffect, useRef} from "react";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import {nodeCreatorRegistry} from "@/src/lib/constants/node-registry";
import {useNodeEditorStore} from "@/src/lib/stores/node-editor.store";
import {useFilteredList} from "@/src/lib/hooks/useFilteredList";

interface NodeSearchDialogProps {
    open: boolean;
    onClose: () => void;
    position?: { x: number; y: number };
    onNodeAdded?: (nodeId: string, type: string) => void;
}

type NodeEntry = [string, { label: string }];

const ALL_NODES: NodeEntry[] = Object.entries(nodeCreatorRegistry);
const matchNode = ([, {label}]: NodeEntry, query: string) =>
    label.toLowerCase().includes(query.toLowerCase());

export default function NodeSearchDialog({open, onClose, position, onNodeAdded}: NodeSearchDialogProps) {
    const addNode = useNodeEditorStore(s => s.addNode);
    const inputRef = useRef<HTMLInputElement>(null);
    const list = useFilteredList(ALL_NODES, matchNode);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 150);
    }, [open]);

    const selectNode = useCallback(([type]: NodeEntry) => {
        const id = addNode(type, position);
        if (id) onNodeAdded?.(id, type);
        onClose();
    }, [addNode, onClose, position, onNodeAdded]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            transitionDuration={120}
            slotProps={{
                transition: {onEnter: list.reset},
                paper: {className: 'w-[420px] max-h-[480px] rounded-lg overflow-hidden !bg-none'},
            }}
        >
            <div className="flex items-center px-4 py-3 gap-3">
                <SearchIcon className="text-gray-400 shrink-0" />
                <InputBase
                    inputRef={inputRef}
                    fullWidth
                    placeholder="Search nodes…"
                    value={list.query}
                    onChange={e => list.setQuery(e.target.value)}
                    onKeyDown={e => list.handleKeyDown(e, selectNode)}
                    className="text-sm"
                />
            </div>
            <hr className="border-gray-200" />
            <List disablePadding className="max-h-96 overflow-y-auto">
                {list.filtered.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-400">No nodes found</p>
                ) : list.filtered.map(([type, {label}], i) => (
                    <ListItemButton
                        key={type}
                        selected={i === list.focusedIndex}
                        onClick={() => selectNode([type, {label}])}
                        onMouseMove={() => list.setFocusedIndex(i)}
                        className="px-4 py-2.5"
                    >
                        <ListItemText
                            primary={label}
                            slotProps={{
                                primary: {className: i === list.focusedIndex ? 'font-semibold' : ''},
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Dialog>
    );
}
