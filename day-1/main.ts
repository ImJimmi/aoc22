import {collectElves} from "./elves";
import {compare, sum} from "../utils/math";
import {readLocalFile} from "../utils/io";

function part1() {
    const caloriesList = readLocalFile("calories-list.txt",__dirname);
    console.log(
        collectElves(caloriesList)
            .sort(compare)
            .reverse()
            .map(elf => elf.reduce(sum))
            .at(0)
    );
}

function part2() {
    const caloriesList = readLocalFile("calories-list.txt", __dirname);
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
