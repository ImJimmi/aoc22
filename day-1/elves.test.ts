import {collectElves} from "./elves";

test("collecting elves from an empty input", () => {
    const caloriesList = "";
    expect(collectElves(caloriesList))
        .toStrictEqual([]);
});

test("collecting elves from a single input", () => {
    const caloriesList = "3894";
    expect(collectElves(caloriesList))
        .toStrictEqual([[3894]]);
});

test("collecting elves from two-line input", () => {
    const caloriesList = `
        94018
        738
    `;
    expect(collectElves(caloriesList))
        .toStrictEqual([[94018, 738]]);
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
            [3803, 413],
            [7058, 6742, 948],
        ]);
});
