import {compare} from "../utils/math";

test("compare arrays with equal sums", () => {
    expect(compare([], []))
        .toBe(0);
    expect(compare([1, 3], [2, 1, 1]))
        .toBe(0);
    expect(compare([2, 4, 5], [3, 3, 3, 2]))
        .toBe(0);
});

test("compare arrays with different sums", () => {
    expect(compare([3], [4, 6]))
        .toBeLessThan(0);
    expect(compare([74, 3784], [3, 4, 378]))
        .toBeGreaterThan(0);
});
