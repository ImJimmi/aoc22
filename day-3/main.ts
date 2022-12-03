import { readLocalFile } from "../utils/io";
import { sum } from "../utils/math";

const asciiLowerA = "a".charCodeAt(0) || -1;
const asciiUpperA = "A".charCodeAt(0) || -1;

function intersection(other: string): RegExp {
    return new RegExp(`[${other}]`, "g");
}

function part1() {
    const inventory = readLocalFile("inventory.txt", __dirname);

    console.log(
        inventory
            .trim()
            .split("\n")
            .map(line => [
                line.slice(0, line.length / 2),
                line.slice(line.length / 2, line.length)
            ])
            .map(pair =>
                pair[0]
                    .match(intersection(pair[1]))
                    ?.at(0)
            )
            .map(item => item?.toLowerCase() === item
                ? (item?.charCodeAt(0) || -1) - asciiLowerA + 1
                : (item?.charCodeAt(0) || -1) - asciiUpperA + 27
            )
            .reduce(sum)
    );
}

function part2() {
    const inventory = readLocalFile("inventory.txt", __dirname);

    console.log(
        inventory
            .trim()
            .split("\n")
            .map((_: string, index: number, array: string[]) => {
                return array.slice(index * 3, 3 + index * 3);
            })
            .filter(value => value.length > 0)
            .map(group =>
                group[0]
                    .match(intersection(group[1]))
                    ?.toString()
                    .match(intersection(group[2]))
                    ?.at(0)
            )
            .map(item => item?.toLowerCase() === item
                ? (item?.charCodeAt(0) || -1) - asciiLowerA + 1
                : (item?.charCodeAt(0) || -1) - asciiUpperA + 27
            )
            .reduce(sum)
    );
}

part1();
part2();
