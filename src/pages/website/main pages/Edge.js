import { Button } from '@mui/material';
import { BaseEdge,getSmoothStepPath, 
    EdgeLabelRenderer,
    useReactFlow, } from '@xyflow/react';
    import CloseIcon from '@mui/icons-material/Close';
 
export default function Edge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath,labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Button
     color="error" size="small"
             style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
                // Custom padding for smaller button
               
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