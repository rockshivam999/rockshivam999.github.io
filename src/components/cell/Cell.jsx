import React from 'react';
import './Cell.css';
import { useState } from 'react';
const Cell = ({ detail }) => {
    const [color, setColor] = useState("cyan");
    detail.color = setColor
    return <div className="cell" style={{ backgroundColor: color }}></div>;
};

export default Cell;
