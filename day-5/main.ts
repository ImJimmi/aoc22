import { readLocalFile } from "../utils/io";

function getStacks(rawInput: string) {
    const stacks = 
        rawInput
            .split("\n\n")
            .at(0)
            ?.split("\n")
            .reverse()
            .slice(1, undefined)
            .map(line =>
                line
                    .replaceAll("     ", " [-] ")
                    .replaceAll("    [", "[-] [")
                    .replaceAll("]    ", "] [-]")
                    .split(" ")
                    .map(crate => crate.at(1) || "-")
            );

    return stacks
        ?.at(0)
        ?.map ((_, index) =>
            stacks
                ?.map(row => row[index])
        )
        .map(stack => stack.filter(value => value !== "-"))
    || [];
}

function getMoves(rawInput: string) {
    return rawInput
        .split("\n\n")
        .at(1)
        ?.split("\n")
        .map(line =>
            line
                .match(/\d+/g)
                ?.map(value => parseInt(value)) || []
        )
        || [];
}

const rawInput = readLocalFile("stacks-and-moves.txt", __dirname).trimEnd();
const moves = getMoves(rawInput);

function applyMoves9000(stacks: string[][], moves: number[][]): string[][] {
    moves
        .forEach(move => {
            [...Array(move[0]).keys()]
                .forEach(_ => {
                    const value = stacks[move[1] - 1].pop() || "";
                    stacks[move[2] - 1].push(value);
                });
        });

    return stacks;
}

function collectTopOfEachStack(stacks: string[][]) {
    return stacks
        .map(stack => stack.at(stack.length - 1) || [])
        .flat()
        .join("");
}

console.log(`Part 1: ${collectTopOfEachStack(applyMoves9000(getStacks(rawInput), moves))}.`);

function applyMoves9001(stacks: string[][], moves: number[][]): string[][] {
    moves
        .forEach(move => {
            const values = stacks[move[1] - 1]
                .splice(-move[0], move[0]);
            stacks[move[2] - 1].push(...values);
        });

    return stacks;
}

console.log(`Part 2: ${collectTopOfEachStack(applyMoves9001(getStacks(rawInput), moves))}.`);
