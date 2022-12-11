import { readLocalFile } from "../utils/io";
import { product } from "../utils/math";

class Test {
    divisibleBy = 1;
    ifTrue = 1;
    ifFalse = 1;
}

function getTrailingInt(text: string): number {
    return parseInt(text
        .trim()
        .split(" ")
        .at(-1)
        || "1"
    );
}

function parseTest(notes: string[]): Test {
    const test = new Test();

    test.divisibleBy = getTrailingInt(notes[0]);
    test.ifTrue = getTrailingInt(notes[1]);
    test.ifFalse = getTrailingInt(notes[2]);

    return test;
}

class Monkey {
    items: number[] = [];
    operation: [string, number] = ["+", 0];
    test: Test = new Test();
    inspectionCount = 0;
}

function parseItems(items: string): number[] {
    return items
        .trim()
        .replace("Starting items: ", "")
        .split(", ")
        .map(value => parseInt(value))
        || [];
}

function parseOperation(operation: string): [string, number] {
    operation = operation
        .trim()
        .replace("Operation: new = old ", "");

    return [
        operation.split(" ")[0],
        parseInt(operation.split(" ")[1].replace("old", "-1")),
    ];
}

function parse(notes: string): Monkey {
    const lines = notes.split("\n");
    const monkey = new Monkey();

    monkey.items = parseItems(lines[1]);
    monkey.operation = parseOperation(lines[2]);
    monkey.test = parseTest(lines.slice(3));

    return monkey;
}

function getMonkeys(): Monkey[] {
    return readLocalFile("notes.txt", __dirname)
        .trim()
        .split("\n\n")
        .map(notes => parse(notes));
}

function applyOperation(operation: [string, number], item: number) {
    if (operation[0] === "+")
        return item + operation[1];
    if (operation[0] === "-")
        return item - operation[1];
    if (operation[0] === "*") {
        if (operation[1] === -1)
            return item * item;

        return item * operation[1];
    }
    if (operation[0] === "/")
        return item / operation[1];

    return item;
}

function executeRound(monkeys: Monkey[], relief: (value: number) => number) {
    monkeys.forEach(monkey => {
        monkey.items.forEach(item => {
            monkey.inspectionCount++;

            const worryLevel = Math.floor(
                relief(applyOperation(monkey.operation, item))
            );

            if (worryLevel % monkey.test.divisibleBy === 0) {
                monkeys[monkey.test.ifTrue].items.push(worryLevel);
            } else {
                monkeys[monkey.test.ifFalse].items.push(worryLevel);
            }
        });

        monkey.items = [];
    });
}

function compareMonkeys(a: Monkey, b: Monkey): number {
    return a.inspectionCount - b.inspectionCount;
}

function part1() {
    const monkeys = getMonkeys();

    for (let _ = 0; _ < 20; _++)
        executeRound(monkeys, value => value / 3);

    console.log(
        monkeys
            .sort(compareMonkeys)
            .slice(-2)
            .map(monkey => monkey.inspectionCount)
            .reduce(product)
    );
}

function part2() {
    const monkeys = getMonkeys();
    const divisor =
        monkeys
            .map(monkey => monkey.test.divisibleBy)
            .reduce(product);

    for (let _ = 0; _ < 10000; _++)
        executeRound(monkeys, value => value % divisor);

    console.log(
        monkeys
            .sort(compareMonkeys)
            .slice(-2)
            .map(monkey => monkey.inspectionCount)
            .reduce(product)
    );
}

part1();
part2();
