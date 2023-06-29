import React, { useEffect, useState } from "react";
import Grid from "../grid/Grid";

const GraphVisulizer = ({ size }) => {
    // const [grid, setGrid] = useState();
    let grid = [];

    let gridjsx = <Grid size={size} prepGrid={grid} />
    console.log(grid);


    return (<div>
        {gridjsx}
        {/* {grid[0] ? gridjsx : <>Rendering....</>} */}
    </div>)
}
export default GraphVisulizer;