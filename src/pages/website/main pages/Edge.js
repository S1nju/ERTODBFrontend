import { Button } from '@mui/material';
import { BaseEdge,getSmoothStepPath, 
    EdgeLabelRenderer,
    useReactFlow, } from '@xyflow/react';
    import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
 
export default function Edge({ id, sourceX, sourceY, targetX, targetY,index}) {
  const [edgePath,labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  type=['1:n','n:1','1:1','n:n']
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
     {type[index]}
        <Button
     color="error" size="small"
             style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
              }}
             
              className="nodrag nopan"
           
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          <CloseIcon></CloseIcon>
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}