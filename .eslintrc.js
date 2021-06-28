module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "prettier"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            { SwitchCase: 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double",
            { avoidEscape: true }
        ],
        "semi": [
            "error",
            "always"
        ],
        'no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        "prettier/prettier": "error",
    },
    "settings": {
        "react": {
          "version": 'detect',
        },
      },
};