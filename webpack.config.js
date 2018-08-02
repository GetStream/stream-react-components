const path = require("path");
const fs = require("fs");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.jsx",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /node_modules/,
                loader: "babel-loader",
                // Achtung!
                // no, you can't just put the babel options in here, because Jest explicitly looks for a .babelrc file with presets and plugins.
                options: JSON.parse(fs.readFileSync(".babelrc").toString())
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "stream-react-components.js",
        libraryTarget: "umd"
    }
};
