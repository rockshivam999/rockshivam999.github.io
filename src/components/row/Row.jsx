import React from 'react';
import Cell from '../cell/Cell';
import './Row.css';

const Row = ({ numberOfCells, gridRef, idxnum }) => {
    let row = []
    for (let i = 0; i < numberOfCells; i++) {
        row.push({})
    }

    let jsxrow = (
        <div className="row">
            {Array.from({ length: numberOfCells }, (_, index) => (
                <Cell detail={row[index]} />
            ))}
        </div>
    )
    gridRef[idxnum] = row
    return jsxrow;
};

export default Row;
