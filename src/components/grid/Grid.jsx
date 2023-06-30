import React, { useEffect } from "react";
import Row from "../row/Row";
import "./Grid.css"

const Grid = ({ prepGrid,updateCell }) => {
    let rows = [];

    if (prepGrid)
        for (let i = 0; i < prepGrid.length; i++) {

            rows.push(<Row gridRef={prepGrid} row={i} updateCell={updateCell} />);
        }

    return (<div className="grid-container">
        <div className="grid">
            {rows}

        </div>
    </div >
    );
}
export default Grid;