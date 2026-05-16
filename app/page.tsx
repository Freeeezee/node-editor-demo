import {NodeEditorProvider} from "@/app/lib/context/NodeEditorContext";
import NodeEditor from "@/app/lib/components/NodeEditor";
import {ReactFlowProvider} from "@xyflow/react";

export default function Home() {
    return (
        <ReactFlowProvider>
            <NodeEditorProvider>
                <NodeEditor />
            </NodeEditorProvider>
        </ReactFlowProvider>
    );
}
