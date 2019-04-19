const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = ({ config, mode }) => {
    config.module.rules.push({
        test: /\.tsx?$/,
        include: [/src/, /examples/, /.storybook/],
        use: [
            {
                loader: "awesome-typescript-loader",
                options: {
                    useCache: true,
                    reportFiles: ["src/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"]
                }
            },
            {
                loader: "react-docgen-typescript-loader"
            }
        ]
    });

    config.module.rules.push({
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: [/src/, /examples/, /.storybook/]
    });

    config.plugins.push(new HardSourceWebpackPlugin());

    return {
        ...config,
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        }
    };
};
