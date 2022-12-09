import { readLocalFile } from "../utils/io";

type Step = [string, number];
type Knot = [number, number];
type Rope = Knot[];

function moveRope(rope: Rope, step: Step, tailTrail: Knot[]) {
    let xMove = 0;
    let yMove = 0;

    if (step[0] === "L")
        xMove = -1;
    if (step[0] === "R")
        xMove = 1;
    if (step[0] === "U")
        yMove = 1;
    if (step[0] === "D")
        yMove = -1;

    for (let _ = 0; _ < step[1]; _++) {
        const newRope = new Array(rope.length);
        rope.forEach((value, index) => newRope[index] = value);
        newRope[0] = [
            rope[0][0] + xMove,
            rope[0][1] + yMove,
        ];

        for (let currentKnot = 1; currentKnot < rope.length; currentKnot++) {
            const previousKnot = currentKnot - 1;

            const horizontalOutOfRange = Math.abs(newRope[currentKnot][0] - newRope[previousKnot][0]) > 1;
            const verticalOutOfRange = Math.abs(newRope[currentKnot][1] - newRope[previousKnot][1]) > 1;

            if (horizontalOutOfRange && verticalOutOfRange) {
                newRope[currentKnot] = rope[previousKnot];
            } else if (horizontalOutOfRange) {
                newRope[currentKnot] = [
                    rope[previousKnot][0],
                    newRope[previousKnot][1],
                ];
            } else if (verticalOutOfRange) {
                newRope[currentKnot] = [
                    newRope[previousKnot][0],
                    rope[previousKnot][1],
                ];
            }
        }

        newRope.forEach((value, index) => rope[index] = value);
        tailTrail.push(rope[rope.length - 1]);
    }
}

function applyStepsToNewRopeAndGetTailTrail(steps: Step[], ropeLength: number): Knot[] {
    const rope: Rope = new Array(ropeLength).fill([0, 0]);
    const tailTrail = [rope[rope.length - 1]];

    steps
        .forEach(step => {
            moveRope(rope, step, tailTrail);
        });

    return tailTrail;
}

function getUniques(knots: Knot[]): Knot[] {
    return knots
        .filter((value, index) =>
            knots.indexOf(
                knots
                    .find((v) =>
                        v[0] === value[0] && v[1] === value[1]
                    ) || [0, 0]
            ) === index
        );
}

function getSteps(): Step[] {
    return readLocalFile("steps.txt", __dirname)
        .trim()
        .split("\n")
        .map(line => [
            line.split(" ")[0] || "",
            parseInt(line.split(" ")[1] || ""),
        ]);
}

function part1() {
    let trail = applyStepsToNewRopeAndGetTailTrail(getSteps(), 2);
    trail = getUniques(trail);

    console.log(`Part 1: Tail visited ${trail.length} unique positions!`);
}

function part2() {
    let trail = applyStepsToNewRopeAndGetTailTrail(getSteps(), 10);
    trail = getUniques(trail);

    console.log(`Part 2: Tail visited ${trail.length} unique positions!`);
}

part1();
part2();
