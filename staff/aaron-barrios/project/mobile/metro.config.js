const path = require("path")

module.exports = {
    resolver: {
        extraNodeModules: {
            com: path.resolve(__dirname, "../com"),
        },
    },
    watchFolders: [
        path.resolve(__dirname, "../com"),
    ],
}
