import React, { useEffect } from "react";
import Row from "../row/Row";
import "./Grid.css"

const Grid = ({ size, prepGrid }) => {
    let rows = [];
    let gridMap = [];

    for (let i = 0; i < size; i++) {
        gridMap.push([])
        rows.push(<Row numberOfCells={size} gridRef={gridMap} idxnum={i} />);
    }
    // useEffect((gridMap) => { prepGrid(gridMap) }, [gridMap]);
    prepGrid.push(gridMap);
    // console.log(gridMap);
    return (<div className="grid-container">
        <div className="grid">
            {rows}

        </div>
    </div >
    );
}
export default Grid;