import { readLocalFile } from "../utils/io";

function range(from: number, to: number): number[] {
    return [...Array(to - from + 1).keys()]
        .map(value => value + from);
}

type AssignmentPairs = number[][][];
const assignmentPairs: AssignmentPairs = (
    readLocalFile("assignment-pairs.txt", __dirname)
        .trim()
        .split("\n")
        .map(line =>
            line
                .split(",")
                .map(assignment =>
                    assignment
                        .split("-")
                        .map(value => parseInt(value))
                )
                .map(assignment => range(
                    Math.min(...assignment),
                    Math.max(...assignment)
                ))
        )
);

function countFullyContainedPairs(assignmentPairs: AssignmentPairs) {
    return (
        assignmentPairs
            .filter(pair => {
                return pair[0].every(value => pair[1].includes(value))
                || pair[1].every(value => pair[0].includes(value));
            })
            .length
    );
}

function countPartiallyContainedPairs(assignmentPairs: AssignmentPairs) {
    return (
        assignmentPairs
            .filter(pair => {
                return pair[0].some(value => pair[1].includes(value))
                    || pair[1].some(value => pair[0].includes(value));
            })
            .length
    );
}

console.log(`Part 1: ${countFullyContainedPairs(assignmentPairs)} fully contained pairs.`);
console.log(`Part 2: ${countPartiallyContainedPairs(assignmentPairs)} partially contained pairs.`);
