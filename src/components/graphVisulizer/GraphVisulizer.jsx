import React, { useEffect, useState } from "react";
import Grid from "../grid/Grid";

const GraphVisulizer = ({ size }) => {
    // const [grid, setGrid] = useState();
    let grid = Array(size);
    for (let i = 0; i < size; i++) {
        grid[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            grid[i][j] = {
                color: "red",
                isSrc: false,
                isDest: false,
            };
        }
    }
    const [gridhook, setGridHook] = useState(grid)
    useEffect(() => { setGridHook(grid) }, [grid])

    let gridjsx = <Grid prepGrid={gridhook} />
    // console.log(gridref);


    return (<div>
        {gridjsx}
        {/* <button onClick={() => showPath(gridref)}> click me</button> */}
        {/* {grid[0] ? gridjsx : <>Rendering....</>} */}
    </div>)
}
function showPath(gridref) {
    let grid = gridref[0];
    grid[0][0].setSrc(true);
    grid[0][0].setColor('green');
    grid[45][39].setDest(true);

    grid[45][39].setColor('red');
    console.log(gridref);
    console.log(grid);
    const startNode = [0, 0]; // Starting node coordinates
    const visited = createVisitedArray(grid.length, grid[0].length);
    console.log("before")

    console.log(grid[45][39].isDest())
    console.log(grid[45][39])
    // return;
    const handleClick = () => {
        // Function to be executed after 1 second delay
        const delayedFunction = () => {
            // Call your function here
            dfs(startNode, grid, visited);
        };

        // Delay execution of the function for 1 second
        setTimeout(delayedFunction, 1000);
    };
    handleClick();
    console.log("after")
    console.log(grid[45][39].isDest())
    // Display the grid with the path
    // for (let i = 0; i < grid.length; i++) {
    //     for (let j = 0; j < grid[i].length; j++) {
    //         console.log(grid[i][j]);
    //     }
    // }
}

function dfs(node, grid, visited) {
    const stack = [];
    let c = 0;
    // Push the starting node to the stack
    stack.push(node);

    while (stack.length > 0) {
        const current = stack.pop();
        const [row, col] = current;
        const currentNode = grid[row][col];

        if (!visited[row][col]) {
            visited[row][col] = true;

            // Update the color of the current node to pink
            if (!currentNode.isSrc() && !currentNode.isDest()) {
                // Update the color of the current node to pink
                currentNode.setColor('pink');
            }
            // c += 1
            // console.log(c)

            // Check if the current node is the destination node
            if (currentNode.isDest()) {
                console.log("found dest")
                break; // Stop traversal if the destination is found

            }

            // Check adjacent nodes
            const neighbors = getNeighbors(current, grid);
            for (const neighbor of neighbors) {
                stack.push(neighbor);
            }
        }
    }
}

function getNeighbors(node, grid) {
    const directions = [
        [1, 0], // down
        [-1, 0], // up
        [0, 1], // right
        [0, -1] // left
    ];

    const neighbors = [];

    const [row, col] = node;
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (const direction of directions) {
        const newRow = row + direction[0];
        const newCol = col + direction[1];

        // Check if the new coordinates are within the grid boundaries
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            const neighbor = grid[newRow][newCol];

            // Add the neighbor if it is not the source or destination
            if (!neighbor.isSrc() && !neighbor.isDest()) {
                neighbors.push([newRow, newCol]);
            }
        }
    }

    return neighbors;
}

function createVisitedArray(rows, cols) {
    const visited = [];
    for (let i = 0; i < rows; i++) {
        visited.push(new Array(cols).fill(false));
    }
    return visited;
}

export default GraphVisulizer;
