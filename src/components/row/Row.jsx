import React from 'react';
import Cell from '../cell/Cell';
import './Row.css';

const Row = ({ gridRef, row }) => {

    let jsxrow = (
        <div className="row">
            {Array.from({ length: gridRef[row].length }, (_, index) => (
                <Cell gridRef={gridRef} row={row} col={index} />
            ))}
        </div>
    )
    return jsxrow;
};

export default Row;
