import { playRPS, score, whatToPlay } from "./rock-paper-scissors";

test("playing rock-paper-scissors", () => {
    expect(playRPS("A", "X")).toBe(3);
    expect(playRPS("A", "Y")).toBe(6);
    expect(playRPS("A", "Z")).toBe(0);
    expect(playRPS("B", "X")).toBe(0);
    expect(playRPS("B", "Y")).toBe(3);
    expect(playRPS("B", "Z")).toBe(6);
    expect(playRPS("C", "X")).toBe(6);
    expect(playRPS("C", "Y")).toBe(0);
    expect(playRPS("C", "Z")).toBe(3);
});

test("the score of the player's choice", () => {
    expect(score("X")).toBe(1);
    expect(score("Y")).toBe(2);
    expect(score("Z")).toBe(3);
});

test("what the player should play", () => {
    expect(whatToPlay("A", "X")).toBe("Z");
    expect(whatToPlay("A", "Y")).toBe("X");
    expect(whatToPlay("A", "Z")).toBe("Y");
    expect(whatToPlay("B", "X")).toBe("X");
    expect(whatToPlay("B", "Y")).toBe("Y");
    expect(whatToPlay("B", "Z")).toBe("Z");
    expect(whatToPlay("C", "X")).toBe("Y");
    expect(whatToPlay("C", "Y")).toBe("Z");
    expect(whatToPlay("C", "Z")).toBe("X");
});
