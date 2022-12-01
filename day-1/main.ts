import {readFileSync} from "fs";
import {join} from "path";
import {collectElves} from "./elves";
import {compare, sum} from "../utils/math";

function readLocalFile(localFileName: string): string {
    const fullPath = join(__dirname, localFileName).replace("out/", "");
    return readFileSync(fullPath).toString();
}

function part1() {
    const caloriesList = readLocalFile("calories-list.txt");
    console.log(
        collectElves(caloriesList)
            .sort(compare)
            .reverse()
            .map(elf => elf.reduce(sum))
            .at(0)
    );
}

function part2() {
    const caloriesList = readLocalFile("calories-list.txt");
    console.log(
        collectElves(caloriesList)
            .sort(compare)
            .reverse()
            .slice(0, 3)
            .map(elf => elf.reduce(sum))
            .reduce((previous, current) => previous + current)
    );
}

part1();
part2();
