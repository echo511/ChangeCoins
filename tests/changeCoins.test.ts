import { default as changeCoins } from "../src/changeCoins"

test(
    'change 11 using 1, 2, 5', () => {
        expect(changeCoins(11, [1, 2, 5])).toEqual({
            change: 11,
            coins: [5, 5, 1],
            count: 3
        })
    }
)

test(
    'change 10 using 2, 3, 4', () => {
        expect(changeCoins(10, [2, 3, 4])).toEqual({
            change: 10,
            coins: [4, 4, 2],
            count: 3
        })
    }
)

test(
    'change 6 using 1, 3, 4 (greedy method fails here)', () => {
        expect(changeCoins(6, [1, 3, 4])).toEqual({
            change: 6,
            coins: [3, 3],
            count: 2
        })
    }
)

test(
    'change 5 using 2 (throw exception)', () => {
        expect(() => {changeCoins(5, [2])}).toThrow("Cannot change")
    }
)
