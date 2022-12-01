import {collectElves, compareInventories, Elf} from "./count-calories";

test("collecting elves from an empty input", () => {
    const caloriesList = "";
    expect(collectElves(caloriesList))
        .toStrictEqual([]);
});

test("collecting elves from a single input", () => {
    const caloriesList = "3894";
    expect(collectElves(caloriesList))
        .toStrictEqual([new Elf([3894])]);
});

test("collecting elves from two-line input", () => {
    const caloriesList = `
        94018
        738
    `;
    expect(collectElves(caloriesList))
        .toStrictEqual([new Elf([94018, 738])]);
});

test("collecting elves from multi-elf input", () => {
    const caloriesList = `
        3803
        413

        7058
        6742
        948
    `;
    expect(collectElves(caloriesList))
        .toStrictEqual([
            new Elf([3803, 413]),
            new Elf([7058, 6742, 948]),
        ]);
});

test("compare inventories of elves with equal inventories", () => {
    expect(compareInventories(new Elf([]), new Elf([])))
        .toBe(0);
    expect(compareInventories(new Elf([1, 3]), new Elf([2, 1, 1])))
        .toBe(0);
    expect(compareInventories(new Elf([2, 4, 5]), new Elf([3, 3, 3, 2])))
        .toBe(0);
});

test("compare inventories of elves with different inventories", () => {
    expect(compareInventories(new Elf([3]), new Elf([4, 6])))
        .toBeLessThan(0);
    expect(compareInventories(new Elf([74, 3784]), new Elf([3, 4, 378])))
        .toBeGreaterThan(0);
});
