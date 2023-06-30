import React, { useEffect, useState } from "react";
import Grid from "../grid/Grid";
import { async } from "q";

const GraphVisulizer = ({ n }) => {
    // const [grid, setGrid] = useState();
    let grid = Array(n);
    let initialCellState = {
        color: "#FFFEC4",
        isSrc: false,
        isDest: false,
        isWall: false
    };
    for (let i = 0; i < n; i++) {
        grid[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            grid[i][j] = {
                ...initialCellState
            };
        }
    }

    const [gridhook, setGridHook] = useState(grid)
    const updateCell = (i, j, property, value) => {
        // console.log("in update cell")
        // console.log(i, j, property, value)
        const newGrid = [...gridhook];
        // newGrid[i][j] = { ...newGrid[i][j], ...newValues };
        if (property == 'reset') {
            for (let i = 0; i < newGrid.length; i++) {
                for (let j = 0; j < newGrid[i].length; j++) {
                    // if (newGrid[i][j].isSrc) {
                    newGrid[i][j] = { ...initialCellState };
                    // }
                    // newGrid[i][j] = { ...initialCellState };
                }
            }
        }
        else if (property == 'color') {
            newGrid[i][j].color = value
        } else if (property == 'isWall') {
            newGrid[i][j].isWall = true;
            newGrid[i][j].color = 'black'
            newGrid[i][j].isDest = false;
            newGrid[i][j].isSrc = false;
        } else if (property == 'isSrc') {
            for (let i = 0; i < newGrid.length; i++) {
                for (let j = 0; j < newGrid[i].length; j++) {
                    if (newGrid[i][j].isSrc) {
                        newGrid[i][j] = { ...initialCellState };
                    }
                    // newGrid[i][j] = { ...initialCellState };
                }
            }
            newGrid[i][j].isSrc = true;
            newGrid[i][j].color = 'green';
        } else if (property == 'isDest') {
            for (let i = 0; i < newGrid.length; i++) {
                for (let j = 0; j < newGrid[i].length; j++) {
                    if (newGrid[i][j].isDest) {
                        newGrid[i][j] = { ...initialCellState };
                    }
                    // newGrid[i][j] = { ...initialCellState }
                }
            }
            newGrid[i][j].isDest = true;
            newGrid[i][j].color = 'red';
        } else {
            console.log(property + " not found")
        }
        setGridHook(newGrid);
    }

    let gridjsx = <Grid prepGrid={gridhook} updateCell={updateCell} />



    return (<div>
        {gridjsx}
        <button onClick={() => updateCell(0, 0, "reset")}>reset grid</button>
        <button onClick={() => { callGraphAlgo('bfs', gridhook, n, updateCell, 10, false) }}> bfs</button>
        <button onClick={() => { callGraphAlgo('dfs', gridhook, n, updateCell, 10, false) }}> dfs</button>
        <button onClick={() => { callGraphAlgo('bidirectionalBfs', gridhook, n, updateCell, 10, false) }}> bidirection bfs</button>

    </div>)
}
const callGraphAlgo = (algo, gridhook, n, updateCell, speed, allowDiagonals) => {
    if (algo == 'bfs') {
        bfs(gridhook, n, updateCell, speed, allowDiagonals);
    } else if (algo == 'dfs') {
        dfs(gridhook, n, updateCell, speed, allowDiagonals);

    } else if (algo == 'bidirectionalBfs') {
        bidirectionalBfs(gridhook, n, updateCell, speed, allowDiagonals);

    }
};
const bidirectionalBfs = async (grid, size, updateCell, delay, allowDiagonals) => {
    let directionVectors = [
        [-1, 0],  // Up
        [0, 1],   // Right
        [1, 0],   // Down
        [0, -1],  // Left
    ];
    const diagonals = [[-1, 1], [1, 1], [1, -1], [-1, -1]]
    if (allowDiagonals) {
        directionVectors = [...directionVectors, ...diagonals]
    }
    let source = null;
    let destination = null;

    // Find source and destination cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isSrc) source = [i, j];
            if (grid[i][j].isDest) destination = [i, j];
        }
    }

    // If source or destination are not found, stop
    if (!source || !destination) {
        console.error('Source or destination not found');
        return;
    }

    let visitedFromSource = Array(size).fill(null).map(() => Array(size).fill(false));
    let cameFromSource = Array(size).fill(null).map(() => Array(size).fill(null));

    let visitedFromDest = Array(size).fill(null).map(() => Array(size).fill(false));
    let cameFromDest = Array(size).fill(null).map(() => Array(size).fill(null));

    let queueFromSource = [source];
    visitedFromSource[source[0]][source[1]] = true;

    let queueFromDest = [destination];
    visitedFromDest[destination[0]][destination[1]] = true;

    let meetPoint = null;

    while (queueFromSource.length > 0 && queueFromDest.length > 0) {
        let [i, j] = queueFromSource.shift();
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "lightgreen");  // Mark as visited from source
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        let [x, y] = queueFromDest.shift();
        if (!grid[x][y].isSrc && !grid[x][y].isDest) {
            updateCell(x, y, "color", "lightblue");  // Mark as visited from dest
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        for (let direction of directionVectors) {
            let ni = i + direction[0];
            let nj = j + direction[1];
            if (ni >= 0 && nj >= 0 && ni < size && nj < size && !visitedFromSource[ni][nj] && !grid[ni][nj].isWall) {
                queueFromSource.push([ni, nj]);  // Enqueue
                visitedFromSource[ni][nj] = true;
                cameFromSource[ni][nj] = [i, j];

                if (visitedFromDest[ni][nj]) {
                    meetPoint = [ni, nj];
                    break;
                }
            }
        }

        for (let direction of directionVectors) {
            let nx = x + direction[0];
            let ny = y + direction[1];
            if (nx >= 0 && ny >= 0 && nx < size && ny < size && !visitedFromDest[nx][ny] && !grid[nx][ny].isWall) {
                queueFromDest.push([nx, ny]);  // Enqueue
                visitedFromDest[nx][ny] = true;
                cameFromDest[nx][ny] = [x, y];

                if (visitedFromSource[nx][ny]) {
                    meetPoint = [nx, ny];
                    break;
                }
            }
        }

        if (meetPoint !== null) {
            break;
        }
    }

    // Draw the path from source to meetPoint
    let [i, j] = meetPoint;
    while ((i !== source[0] || j !== source[1]) && cameFromSource[i][j]) {
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "blue");  // Mark as part of the path
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        [i, j] = cameFromSource[i][j];
    }

    // Draw the path from meetPoint to destination
    let [x, y] = meetPoint;
    while ((x !== destination[0] || y !== destination[1]) && cameFromDest[x][y]) {
        if (!grid[x][y].isSrc && !grid[x][y].isDest) {
            updateCell(x, y, "color", "blue");  // Mark as part of the path
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        [x, y] = cameFromDest[x][y];
    }
};

const dfs = async (grid, size, updateCell, delay, allowDiagonals) => {
    let directionVectors = [
        [-1, 0],  // Up
        [0, 1],   // Right
        [1, 0],   // Down
        [0, -1],  // Left
    ];
    const diagonals = [[-1, 1], [1, 1], [1, -1], [-1, -1]]
    if (allowDiagonals) {
        directionVectors = [...directionVectors, ...diagonals]
    }
    let source = null;
    let destination = null;

    // Find source and destination cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isSrc) source = [i, j];
            if (grid[i][j].isDest) destination = [i, j];
        }
    }

    // If source or destination are not found, stop
    if (!source || !destination) {
        console.error('Source or destination not found');
        return;
    }

    let visited = Array(size).fill(null).map(() => Array(size).fill(false));
    let cameFrom = Array(size).fill(null).map(() => Array(size).fill(null));

    let stack = [source];
    visited[source[0]][source[1]] = true;

    while (stack.length > 0) {
        let [i, j] = stack.pop();  // Pop from stack
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "lightgreen");  // Mark as visited
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        if (i === destination[0] && j === destination[1]) {
            break;  // Found the destination
        }

        for (let direction of directionVectors) {
            let ni = i + direction[0];
            let nj = j + direction[1];
            if (ni >= 0 && nj >= 0 && ni < size && nj < size && !visited[ni][nj] && !grid[ni][nj].isWall) {
                stack.push([ni, nj]);  // Push to stack
                visited[ni][nj] = true;
                cameFrom[ni][nj] = [i, j];
            }
        }
    }

    // Draw the path
    let [i, j] = destination;
    while ((i !== source[0] || j !== source[1]) && cameFrom[i][j]) {
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "blue");  // Mark as part of the path
            await new Promise(resolve => setTimeout(resolve, delay * 2));
        }
        [i, j] = cameFrom[i][j];
    }
};

const bfs = async (grid, size, updateCell, delay, allowDiagonals) => {
    let directionVectors = [
        [-1, 0],  // Up
        [0, 1],   // Right
        [1, 0],   // Down
        [0, -1],  // Left
    ];
    const diagonals = [[-1, 1], [1, 1], [1, -1], [-1, -1]]
    if (allowDiagonals) {
        directionVectors = [...directionVectors, ...diagonals]
    }
    let source = null;
    let destination = null;

    // Find source and destination cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isSrc) source = [i, j];
            if (grid[i][j].isDest) destination = [i, j];
        }
    }

    // If source or destination are not found, stop
    if (!source || !destination) {
        console.error('Source or destination not found');
        return;
    }

    let visited = Array(size).fill(null).map(() => Array(size).fill(false));
    let cameFrom = Array(size).fill(null).map(() => Array(size).fill(null));

    let queue = [source];
    visited[source[0]][source[1]] = true;

    while (queue.length > 0) {
        let [i, j] = queue.shift();  // Dequeue
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "lightgreen");  // Mark as visited
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        if (i === destination[0] && j === destination[1]) {
            break;  // Found the destination
        }

        for (let direction of directionVectors) {
            let ni = i + direction[0];
            let nj = j + direction[1];
            if (ni >= 0 && nj >= 0 && ni < size && nj < size && !visited[ni][nj] && !grid[ni][nj].isWall) {
                queue.push([ni, nj]);  // Enqueue
                visited[ni][nj] = true;
                cameFrom[ni][nj] = [i, j];
            }
        }
    }

    // Draw the path
    let [i, j] = destination;
    while ((i !== source[0] || j !== source[1]) && cameFrom[i][j]) {
        if (!grid[i][j].isSrc && !grid[i][j].isDest) {
            updateCell(i, j, "color", "blue");  // Mark as part of the path
            await new Promise(resolve => setTimeout(resolve, delay * 2));
        }
        [i, j] = cameFrom[i][j];
    }
};


export default GraphVisulizer;
