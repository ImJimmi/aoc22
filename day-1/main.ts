import {readFileSync} from "fs";
import {join} from "path";
import { collectElves, compareInventories, countCalories } from "./count-calories";

function readLocalFile(localFileName: string): string {
    const fullPath = join(__dirname, localFileName).replace("out/", "");
    return readFileSync(fullPath).toString();
}

function part1() {
    const caloriesList = readLocalFile("part1.txt");
    console.log(
        collectElves(caloriesList)
            .sort(compareInventories)
            .reverse()
            .map(elf => countCalories(elf))
            .at(0)
    );
}

part1();
