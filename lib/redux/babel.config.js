const presets = [
    ["@babel/env", {
        "targets": {
            "browsers": ["last 2 versions", "safari >= 7"]
        },
    }],
    ["@babel/react"]
];

const plugins = [
    ["@babel/plugin-proposal-class-properties"]
]

module.exports = { presets, plugins };