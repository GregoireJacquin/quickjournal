import {NodeData} from "../utils/types.ts";
import {useState} from "react";
import {useFocusedNodeIndex} from "./useFocusedNodeIndex.ts";
import {Cover} from "./Cover.tsx";
import {Title} from "./Title.tsx";
import {BasicNode} from "../Node/BasicNode.tsx";
import {Spacer} from "./Spacer.tsx";
import {nanoid} from "nanoid";

export const Page = () => {

    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [title, setTitle] = useState<string>("");
    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({nodes});

    const addNode = (node: NodeData, index: number) => {
        const newNodes = [...nodes];
        newNodes.splice(index, 0, node);
        setNodes(newNodes);
    }
    const removeNodeByIndex = (index: number) => {
        const newNodes = [...nodes];
        newNodes.splice(index, 1);
        setNodes(newNodes);
    }
    const changeNodeValue = (index: number, value: string) => {
        const newNodes = [...nodes];
        newNodes[index].value = value;
        setNodes(newNodes);
    }
    return (
        <>
            <Cover/>
            <div>
                <Title title={title} changePageTitle={setTitle} addNode={addNode}/>
                {nodes.map((node, index) => {
                    return (
                        <BasicNode
                            key={node.id}
                            node={node}
                            updateFocusedIndex={setFocusedNodeIndex}
                            isFocused={focusedNodeIndex === index}
                            index={index}
                            addNode={addNode}
                            removeNodeByIndex={removeNodeByIndex}
                            changeNodeValue={changeNodeValue}
                        />
                    )
                })}
                <Spacer handleClick={() => addNode({type: "text", value: "", id: nanoid()}, nodes.length)}
                        showHint={!nodes.length}/>
            </div>
        </>
    )
}
