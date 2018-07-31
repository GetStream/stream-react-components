const path = require("path");

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
                options: {
                    presets: [
                        "env", "react"
                    ],
                    plugins: ["transform-class-properties", "transform-object-rest-spread"]
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "stream-react-components.js",
        libraryTarget: "umd"
    }
};
