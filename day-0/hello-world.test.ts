import { getMessage } from "./hello-world";

test('message says "Hello, World!"', () => {
    expect(getMessage()).toBe("Hello, World!");
});
