import { readLocalFile } from "../utils/io";

function areAllUnique(value: string[]): boolean {
    return value.length === [... new Set(value)].length;
}

function indexOfFirstNUnique(input: string[], N: number): number {
    const mappedInput = input
        .map((_, index, signal) =>
            signal.slice(index, index + N)
        );

    return mappedInput.indexOf(
        mappedInput
            .filter(areAllUnique)
            .at(0)
            || []
    ) + N;
}

const signal = readLocalFile("signal.txt", __dirname).split("");
console.log(`Part 1: First start-of-packet marker at ${indexOfFirstNUnique(signal, 4)}.`);
console.log(`Part 2: First start-of-message marker at ${indexOfFirstNUnique(signal, 14)}.`);
