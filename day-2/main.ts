import { readLocalFile } from "../utils/io";
import { playRPS, score, whatToPlay } from "./rock-paper-scissors";
import { sum } from "../utils/math";

function part1() {
    const strategy = readLocalFile("strategy.txt", __dirname);

    console.log(
        strategy
            .trim()
            .split("\n")
            .map(line => line.trim().replace(" ", ""))
            .map(line => playRPS(line[0], line[1]) + score(line[1]))
            .reduce(sum)
    );
}

function part2() {
    const strategy = readLocalFile("strategy.txt", __dirname);

    console.log(
        strategy
            .trim()
            .split("\n")
            .map(line => line.trim().replace(" ", ""))
            .map(line => line[0] + whatToPlay(line[0], line[1]))
            .map(line => playRPS(line[0], line[1]) + score(line[1]))
            .reduce(sum)
    );
}

part1();
part2();
