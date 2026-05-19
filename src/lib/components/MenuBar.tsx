
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface MenuBarProps {
    onAddClick: () => void;
}

export default function MenuBar({onAddClick}: MenuBarProps) {
    return (
        <div className={'w-screen absolute top-0 left-0 flex flex-row justify-center p-5 z-10'}>
            <Fab size={'medium'} color={'primary'} onClick={onAddClick}>
                <AddIcon />
            </Fab>
        </div>
    )
}
