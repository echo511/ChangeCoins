export type ChangedCoins = {
    change: number
    count: number
    coins: Array<number>
}

export default function (change: number, coins: Array<number>): ChangedCoins {
    const cache = new Map<number, ChangedCoins>()

    const fn = (change: number): ChangedCoins => {
        if (cache.has(change)) return cache.get(change)

        let minimumCount = change
        let minimumCoin: number | undefined = undefined
        let append: Array<number> = [] // Coins from subsolution

        coins.forEach((coin) => {
            let inner: ChangedCoins | undefined = undefined
            let step: number = change

            const subtract = change - coin

            if (subtract == 0) {
                step = 1
            }

            if (subtract > 0) {
                try {
                    inner = fn(subtract)
                    step = 1 + inner.count
                } catch (error) {
                    // Inner solution can lead nowhere. That's fine here.
                }
            }

            if (step < minimumCount) {
                minimumCount = step
                minimumCoin = coin
                append = inner ? [...inner.coins] : []
            }
        })

        const changedCoins: ChangedCoins = {
            change,
            count: minimumCount,
            coins: append
        }

        if (minimumCoin === undefined) throw "Cannot change" // No solution found.

        changedCoins.coins.push(minimumCoin)

        cache.set(change, changedCoins)

        return changedCoins
    }

    return fn(change)
}
