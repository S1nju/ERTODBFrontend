import { IconButton } from '@mui/material';
import { BaseEdge,getSmoothStepPath, 
    EdgeLabelRenderer,
    useReactFlow, } from '@xyflow/react';
    import CloseIcon from '@mui/icons-material/Close';
 
export default function Edge({ id, sourceX, sourceY, targetX, targetY,index}) {
  console.log(index)
  const [edgePath,labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 let  type=['1:n','n:1','1:1','n:n'];
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer><div  style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
              }}>
     <span>{type[0]}</span>
        <IconButton
     color="error" size="small"
            
             
              className="nodrag nopan"
           
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          <CloseIcon></CloseIcon>
        </IconButton></div>
      </EdgeLabelRenderer>
    </>
  );
}