import {NodeEditorProvider} from "@/app/lib/context/NodeEditorContext";
import NodeEditor from "@/app/lib/components/NodeEditor";

export default function Home() {
    return (
        <NodeEditorProvider>
            <NodeEditor />
        </NodeEditorProvider>
    );
}
