export function collectElves(caloriesList: string): number[][] {
    return caloriesList
        .trim()
        .split("\n\n")
        .filter(value => value.length > 0)
        .map(value => value
            .trim()
            .split("\n")
            .map(line => +line)
        );
}
