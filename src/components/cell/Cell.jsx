import React from 'react';
import './Cell.css';

import { useState, useEffect } from 'react';
const Cell = ({ gridRef, row, col, updateCell }) => {
    let color = gridRef[row][col].color
    const [sKeyPressed, setSKeyPressed] = useState(false);
    const [wKeyPressed, setWKeyPressed] = useState(false);
    const [dKeyPressed, setDKeyPressed] = useState(false);
    // Listen for 's' key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 's') {
                setSKeyPressed(true);
            } else if (event.key === 'w') {
                setWKeyPressed(true)
            }
            else if (event.key === 'd') {
                setDKeyPressed(true)
            }
        };

        const handleKeyUp = () => {
            setSKeyPressed(false);
            setWKeyPressed(false);
            setDKeyPressed(false)
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // const handleClick = () => {
    //     if (sKeyPressed) {
    //         console.log('"s" key and mouse were clicked at the same time');
    //     }
    // };
    const setdata = (e) => {
        // console.log(e);


        // console.log(gridRef)
        // console.log(gridRef[row][col])
        if (sKeyPressed) {
            updateCell(row, col, "isSrc", true);
        } else if (dKeyPressed) {
            updateCell(row, col, "isDest", true);
        } else if (wKeyPressed) {
            updateCell(row, col, 'isWall', true)
        }

        // gridRef[row][col].color = 'green'
        // let=gridRef[row]l
        // gridRef[row]=gridRef[row];

    }
    return <div className="cell" style={{ backgroundColor: color }} onMouseOver={() => setdata()} ></div>;

};

export default Cell;
