import { readLocalFile } from "../utils/io";

function range(from: number, to: number): number[] {
    return [...Array(to - from + 1).keys()]
        .map(value => value + from);
}

function part1() {
    const assignmentPairs = readLocalFile("assignment-pairs.txt", __dirname);

    console.log(
        assignmentPairs
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
            .filter(pair => {
                return pair[0].every(value => pair[1].includes(value))
                    || pair[1].every(value => pair[0].includes(value));
            })
            .length
    );
}

function part2() {
    const assignmentPairs = readLocalFile("assignment-pairs.txt", __dirname);

    console.log(
        assignmentPairs
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
            .filter(pair => {
                return pair[0].some(value => pair[1].includes(value))
                    || pair[1].some(value => pair[0].includes(value));
            })
            .length
    );
}

part1();
part2();
