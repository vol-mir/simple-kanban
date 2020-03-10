module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'plugin:vue/essential',
        'standard'
    ],
    'parserOptions': {
        'ecmaVersion': 2018,
        "parser": "babel-eslint"
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        "indent": ["error", 4],
        "semi": [1, "always"]

    },
    'globals': {
        '$': true,
        '_': true
    }
}
