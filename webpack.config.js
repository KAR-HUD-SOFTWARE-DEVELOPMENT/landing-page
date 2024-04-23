const path = require("path")

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: 'r.bundle.js',
    },
    module: {
        rules:[
            {
            test:/\.jsx?/,
            use: ["babel-loader"],
            exclude: /node-modules/
            },
            {
            test:/\.css?/,
            use: ["style-loader","css-loader"],
            exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions : ['.js', '.jsx'] 
    }
}