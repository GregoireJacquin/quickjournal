import {NodeData} from "../utils/types.ts";
import {useState, Dispatch, SetStateAction, useEffect} from "react";

type UseFocusedNodeIndexProps = {
    nodes: NodeData[];
}

export const useFocusedNodeIndex = ({nodes}: UseFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
    const [focusedIndex, setFocusedIndex] = useState(0)
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                setFocusedIndex((prev) => Math.max(prev - 1, 0))
            }
            if (event.key === "ArrowDown") {
                setFocusedIndex((prev) => Math.min(prev + 1, nodes.length - 1))
            }
        }
        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [nodes]);
    return [focusedIndex, setFocusedIndex]
}
