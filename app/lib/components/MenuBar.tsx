import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function MenuBar() {
    return (
        <div className={'w-screen absolute top-0 left-0 flex flex-row justify-center p-5'}>
            <Fab size={'medium'} color={'primary'}>
                <AddIcon />
            </Fab>
        </div>
    )
}
