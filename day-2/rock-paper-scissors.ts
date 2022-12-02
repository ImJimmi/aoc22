export function playRPS(abc: string, xyz: string): number {
    if (["AY", "BZ", "CX"].includes(abc + xyz))
        return 6;

    if (["AZ", "BX", "CY"].includes(abc + xyz))
        return 0;

    return 3;
}

export function score (xyz: string): number {
    if (xyz === "X")
        return 1;
    if (xyz === "Y")
        return 2;

    return 3;
}

export function whatToPlay(abc: string, xyz: string): string {
    if (["AY", "BX", "CZ"].includes(abc + xyz))
        return "X";
    if (["AZ", "BY", "CX"].includes(abc + xyz))
        return "Y";

    return "Z";
}
