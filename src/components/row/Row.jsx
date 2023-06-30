import React from 'react';
import Cell from '../cell/Cell';
import './Row.css';

const Row = ({ gridRef, row,updateCell }) => {

    let jsxrow = (
        <div className="row">
            {Array.from({ length: gridRef[row].length }, (_, index) => (
                <Cell gridRef={gridRef} row={row} col={index} updateCell={updateCell} />
            ))}
        </div>
    )
    return jsxrow;
};

export default Row;
