import { readLocalFile } from "../utils/io";

type Instruction = [string, number];

function getInstructions(): Instruction[] {
    return readLocalFile("cpu-instructions.txt", __dirname)
        .trim()
        .split("\n")
        .map(line => [
            line.split(" ").at(0) || "",
            parseInt(line.split(" ").at(1) || ""),
        ]);
}

function part1() {
    let cycles = 0;
    let value = 1;
    let signalStrength = 0;
    const samples = [20, 60, 100, 140, 180, 220];

    getInstructions()
        .forEach(instruction => {
            const numTicks = instruction[0] === "addx" ? 2 : 1;

            for (let tick = 0; tick < numTicks; tick++) {
                cycles++;

                if (samples.includes(cycles)) {
                    signalStrength += cycles * value;
                }

                if (tick === numTicks - 1 && instruction[0] === "addx") {
                    value += instruction[1];
                }
            }
        });

    console.log(signalStrength);
}

function part2() {
    let cycles = 0;
    let value = 1;
    const crt: string[] = Array(6).fill("");

    getInstructions()
        .forEach(instruction => {
            const numTicks = instruction[0] === "addx" ? 2 : 1;

            for (let tick = 0; tick < numTicks; tick++) {
                const row = Math.floor(cycles / 40);
                const x = cycles % 40;
                crt[row] = crt.at(row)?.concat([value - 1, value, value + 1].includes(x) ? "█" : " ") || "";

                cycles++;

                if (tick === numTicks - 1 && instruction[0] === "addx") {
                    value += instruction[1];
                }
            }
        });

    console.log(crt);
}

part1();
part2();
