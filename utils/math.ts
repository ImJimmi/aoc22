export function sum(a: number, b: number): number {
    return a + b;
}

export function compare(a: number[], b: number[]): number {
    return a.reduce(sum, 0) - b.reduce(sum, 0);
}
