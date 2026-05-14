'use client'

import {useState} from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NodeSearchDialog from "@/app/lib/components/NodeSearchDialog";

export default function MenuBar() {
    const [searchBarOpen, setSearchBarOpen] = useState(false);

    return (
        <>
            <div className={'w-screen absolute top-0 left-0 flex flex-row justify-center p-5 z-10'}>
                <Fab size={'medium'} color={'primary'} onClick={() => setSearchBarOpen(true)}>
                    <AddIcon />
                </Fab>
            </div>
            <NodeSearchDialog open={searchBarOpen} onClose={() => setSearchBarOpen(false)} />
        </>
    )
}
