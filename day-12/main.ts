import { readLocalFile } from "../utils/io";

function getMap() {
    return readLocalFile("map.txt", __dirname)
        .trim()
        .split("\n")
        .map(line =>
            line
                .replace("S", "a")
                .replace("E", "z")
                .split("")
                .map(char => [
                    char.charCodeAt(0),
                    -1,
                ])
        );
}

const startPosition: [number, number] = [0, 20];
const endPosition: [number, number] = [154, 20];
const steps = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];

function getNumSteps(map: number[][][]) {
    let stepCount = 0;

    while (map[endPosition[1]][endPosition[0]][1] === -1) {
        map.forEach((row, y) =>
            row.forEach((cell, x) => {
                if (cell[1] === stepCount) {
                    steps.forEach(step => {
                        const nextPosition = [
                            x + step[0],
                            y + step[1],
                        ];

                        if (nextPosition[0] >= 0
                            && nextPosition[0] < row.length
                            && nextPosition[1] >= 0
                            && nextPosition[1] < map.length) {

                            const nextCell = map[nextPosition[1]][nextPosition[0]];

                            if (nextCell[1] === -1) {
                                const height = cell[0];
                                const nextHeight = nextCell[0];

                                if (nextHeight <= height + 1) {
                                    nextCell[1] = stepCount + 1;
                                }
                            }
                        }
                    });
                }
            })
        );

        stepCount++;
    }

    return stepCount;
}

function part1() {
    const map = getMap();
    map[startPosition[1]][startPosition[0]][1] = 0;

    console.log(getNumSteps(map));
}

function part2() {
    const map = getMap();
    
    map.forEach(row => {
        row.forEach(cell => {
            if (cell[0] === "a".charCodeAt(0))
                cell[1] = 0;
        });
    });

    console.log(getNumSteps(map));
}

part1();
part2();
