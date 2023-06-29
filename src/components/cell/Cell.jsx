import React from 'react';
import './Cell.css';
import { useState } from 'react';
const Cell = ({ gridRef, row, col }) => {
    let color = gridRef[row][col].color
    const setdata = (e) => {
        console.log(row);
        console.log(col);
        // console.log(gridRef)
        // console.log(gridRef[row][col])
        gridRef[row][col].color = 'white'
        console.log(gridRef[row][col].color)
    }
    return <div className="cell" style={{ backgroundColor: color }} onClick={(e) => setdata(e)}></div>;

};

export default Cell;
