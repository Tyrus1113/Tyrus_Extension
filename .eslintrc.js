module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        'no-console': 'off',
        'no-redeclare': 0,
        'no-unused-vars': 0,
        //不允许出现多余的空格
        "no-multi-spaces": 2, 
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'never'],
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        'computed-property-spacing': [2, 'never'],
        // 控制逗号前后的空格
        'comma-spacing': [2, {'before': false, 'after': true}],
        // if while function 后面的{必须与if在同一行，java风格。
        'brace-style': [2, '1tbs', {'allowSingleLine': true}],
        //不允许出现不规则的空格
        "no-irregular-whitespace": 2, 
        //对象字面量中冒号的前后空格
        "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
        //函数定义时括号前的空格
        "space-before-function-paren": [2, {"anonymous": "never", "named": "never"}],
    }
};