export class Elf {
    inventory: number[];

    constructor(initialInventory: number[]) {
        this.inventory = initialInventory;
    }
}

export function collectElves(caloriesList: string): Elf[] {
    return caloriesList
        .trim()
        .split("\n\n")
        .filter(value => value.length > 0)
        .map(value => new Elf(
            value
                .trim()
                .split("\n")
                .map(line => +line)
        ));
}

export function countCalories(elf: Elf): number {
    return elf.inventory.reduce((previous, current) => previous + current);
}

export function compareInventories(elf1: Elf, elf2: Elf): number {
    return countCalories(elf1) - countCalories(elf2);
}
