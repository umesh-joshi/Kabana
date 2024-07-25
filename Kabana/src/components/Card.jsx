import { motion } from "framer-motion";
import { DropIndicator } from "./DropIndicator";

export const Card = ({ title, taskid, column, handleDragStart }) => {
    return (
      <>
        <DropIndicator beforeId={taskid} column={column} />
        <motion.div
          layout
          layoutId={taskid}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { title, taskid, column })}
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
      </>
    );
  };