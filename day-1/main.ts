import {readFileSync} from "fs";
import {join} from "path";
import { collectElves, compareInventories, countCalories } from "./count-calories";

function readLocalFile(localFileName: string): string {
    const fullPath = join(__dirname, localFileName).replace("out/", "");
    return readFileSync(fullPath).toString();
}

function part1() {
    const caloriesList = readLocalFile("calories-list.txt");
    console.log(
        collectElves(caloriesList)
            .sort(compareInventories)
            .reverse()
            .map(elf => countCalories(elf))
            .at(0)
    );
}

function part2() {
    const caloriesList = readLocalFile("calories-list.txt");
    console.log(
        collectElves(caloriesList)
            .sort(compareInventories)
            .reverse()
            .slice(0, 3)
            .map(elf => countCalories(elf))
            .reduce((previous, current) => previous + current)
    );
}

part1();
part2();
