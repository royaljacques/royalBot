const rconModul = require("./../util/rconModul")

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        async function rconLoad() {
            try {
                await rconModul.connect()
            } catch (e) {
                //attente 1 minute
                setTimeout(() => {
                    rconLoad()
                }, 1000)
            }
        }
        await rconLoad()


    }
}
