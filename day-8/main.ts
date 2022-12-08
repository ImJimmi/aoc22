import { readLocalFile } from "../utils/io";

function getTreeGrid() {
    return readLocalFile("tree-grid.txt", __dirname)
        .trim()
        .split("\n")
        .map(line =>
            line
                .split("")
                .map(char =>
                    parseInt(char) + 1
                )
        );
}

function markVisible(tree: number, index: number, row: number[]): number {
    let previous = -1;

    for (let i = 0; i < index; i++) {
        if (Math.abs(row[i]) > previous) {
            previous = Math.abs(row[i]);
        }
    }

    if (tree > previous) {
        row[index] = -Math.abs(row[index]);
    }

    previous = -1;

    for (let i = row.length - 1; i > index; i--) {
        if (Math.abs(row[i]) > previous) {
            previous = Math.abs(row[i]);
        }
    }

    if (tree > previous) {
        row[index] = -Math.abs(row[index]);
    }

    return row[index];
}

let visibleTrees =
    getTreeGrid()
        .map(row =>row.map(markVisible));
visibleTrees =
    visibleTrees
        ?.at(0)
        ?.map ((_, index) =>
            visibleTrees
                ?.map(row => row[index])
        ) || [];
visibleTrees =
    visibleTrees
        .map(row =>row.map(markVisible));

console.log(
    `Part 1: ${
        visibleTrees
            .flat()
            .filter(tree => tree < 0)
            .length
    } visible trees.`
);

const treeGrid = getTreeGrid();
const scenicScores = getTreeGrid();

for (let y = 0; y < treeGrid.length; y++) {
    const row = treeGrid[y] || [];

    for (let x = 0; x < row.length; x++) {
        let distanceLeft = 1;
        let distanceRight = 1;
        let distanceUp = 1;
        let distanceDown = 1;

        while (row[x - distanceLeft] < row[x] && (x - distanceLeft) > 0)
            distanceLeft += 1;
        while (row[x + distanceRight] < row[x] && (x + distanceRight) < (row.length - 1))
            distanceRight += 1;
        while ((treeGrid[y - distanceUp] || [])[x] < row[x] && (y - distanceUp) > 0)
            distanceUp += 1;
        while ((treeGrid[y + distanceDown] || [])[x] < row[x] && (y + distanceDown) < (treeGrid.length - 1))
            distanceDown += 1;

        scenicScores[y][x] = distanceLeft * distanceRight * distanceUp * distanceDown;
    }
}

console.log(
    Math.max(...scenicScores.flat())
);
