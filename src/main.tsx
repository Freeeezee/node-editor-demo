import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {ReactFlowProvider} from '@xyflow/react';
import {NodeEditorProvider} from '@/src/lib/context/NodeEditorContext';
import NodeEditor from '@/src/lib/components/NodeEditor';
import theme from '@/src/theme';
import '@/src/globals.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReactFlowProvider>
                <NodeEditorProvider>
                    <NodeEditor />
                </NodeEditorProvider>
            </ReactFlowProvider>
        </ThemeProvider>
    </StrictMode>
);
