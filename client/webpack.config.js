const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "static/js"),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                }
                            ],
                            "@babel/preset-react"
                        ],
                        plugins: [
                            [
                                '@babel/plugin-proposal-class-properties',
                                {
                                    loose: true
                                }
                            ]
                        ]
                    }
                }
            },
        ]
    }
}