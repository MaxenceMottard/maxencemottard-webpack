const babelConfig = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": ["last 2 versions", "safari >= 7", "ie >= 7"]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-proposal-optional-catch-binding"
    ]
}

module.exports = babelConfig
