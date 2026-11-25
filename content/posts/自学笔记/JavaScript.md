---
title: 'JavaScript 学习笔记'
summary: JavaScript 学习记录，参考 https://zh.javascript.info/
date: 2026-11-13T08:00:00+08:00
categories: 自学笔记
---

## 简介

JavaScript 运行在 JavaScript 引擎中

常见浏览器引擎：
- V8：Chrome、Edge
- SpiderMonkey：Firefox
- SquirrelFish：Safari

JavaScript 的详细规范写在 [ECMA-262 规范](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

## `<script>` 标签

通过 `<script>` 标签向 HTML 文档的任何位置中加入 JavaScript 代码，常见于 `<head>` 和 `<body>` 末尾

`<script>` 标签可包裹代码，或通过 `src` 属性引入外部 js 文件

## 语句与注释

用分号作为语句结束（可省略但不建议）

单行注释 `//` 开头，多行注释 `/*` 开头，`*/` 结尾

## 变量

声明：小驼峰命名法，大小写敏感

- `let` 声明变量，具有块级作用域，不可重复声明
- `var` 声明变量，具有全局作用域（不推荐）
- `const` 声明常量，不可重新赋值

## 数据类型

类似 Python，JavaScript 为动态类型，共有 8 种数据类型

使用 `typeof <变量>` 可以获取其类型

数据类型会在运算中自动转换，如数字 + 字符串，数字会自动转为字符串

### 数字

整数、小数、无穷大 `Infinity`、错误 `NaN`

`Number()`：转为数字，`undefined` 转为 `NaN`，`null` 转为 0

### BigInt

由于数字类型对 `±(253-1)` 范围外的整数存在精度误差，故引入 `BigInt` 类型表示任意长度整数

形式为将 `n` 添加到整数末尾：`const num = 1234567890123456789012345678901234567890n;`

### 字符串

引号包裹，单引号、双引号、反引号均可

反引号支持将变量包裹在 `${}` 中插入：`` `Hello, ${name}!` ``

`String()`：转为字符串

### 布尔值

`true` `false`

`Boolean()`：转为字符串

### null

表示无、空、未知值

### undefined

表示未分配值

### 对象

### 符号

唯一标识符

## 常用函数

模态窗口：用户无法与页面的其余部分交互，直到处理完窗口

弹出模态窗口的三种函数
- `alert(<信息>)` 带信息窗口
- `result = prompt(<信息>, [<输入框默认值>]);` 带信息和输入框窗口，返回输入内容
- `result = confirm(<信息>);` 带确定和取消按钮的信息窗口，返回 true/false

## 运算符

数学运算符
- 加、减、乘、除、取余、幂运算 `+ - * / % **` `+= -= *= /= %= **=`
- `+` 能拼接字符串
- 自增、自减 `++ --`
- 与、或、非、异或 `& | ~ ^`
- 左移、右移 `<< >>`

比较运算符
- `> < >= <= == != === !==`
- `==` 常规相等性检查，会自动转换类型，无法区分 0 和 false，空字符串和 false
- `===` 严格相等性检查，不转换类型，类型不同会返回 false
- `!=` 和 `!==` 类似

逻辑运算符
- 与、或、非 `&& || !`
- 空值合并运算符 `??`
- 或链：`result = value1 || value2 || value3;` 返回第一个真值，或最后一个值（0 和 '0' 视为假）
- 与链：`result = value1 && value2 && value3;` 返回第一个假值，或最后一个值
- `??` 链：`result = value1 ?? value2 ?? value3;` 返回第一个不是 `null/undefined` 的值，或最后一个参数

## 条件分支

```js
if (condition) {

} else if {

} else {

}
```

三元运算符 `result = condition ? true_value : false_value;` 可赋值也可执行对应语句

```js
switch (x) {
  case value1:
    break;
  case value2:
    break;
  default:
    break;
}
```

对 x 与各值做严格相等检查（类型不同则为 false）

没有 `break` 则依次向下执行

## 循环

```js
while (condition) {

}
```

```js
do {

} while (condition);
```

```js
for (begin; condition; step) {

}
```

循环中可使用 `continue` 和 `break`

可通过 `break/continue <标签>` 实现快速跳出嵌套循环，但不可任意 goto

```js
// break 后会直接结束所有循环，直接执行所有循环之后的代码
label: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i + j > 2) {
      break label;
    }
  }
}
```

## 函数

函数声明

```js
function myfun(a, b = 1, c = afun()) {
  return a + b + c;
}

// 函数表达式
let myfun = function () {

}

// 箭头函数
let myfun = (a, b) => a + b;
let myfun = a => a * 2;
let myfun = () => 2 * 2;
let myfun = (a, b) => {
  return a + b;
}
```

使用函数表达式作为函数的参数，则称该参数为回调函数，即稍后会回调该函数表达式

函数外声明的变量为全局变量，函数内可见，**可修改**
函数内声明的变量为局部变量，外部不可见
同名局部变量可遮蔽全局变量

## 对象

```js
// 创建对象
let user = new Object();
let user = {};
let user = {
  name: "Bob",
  age: 30
};

// 添加属性
user.sex = 'male';

// 删除属性
delete user.sex;

// 访问属性
user.name; // 只能使用属性名访问
user[age]; // 可以为表达式
for (let key in user) {
  user[key];
}
```

省略属性名，默认与值变量名相同

```js
let user = {
  name,
  age
};
```

`<属性名> in <对象>` 判别对象是否有该属性，一般 `<属性名>` 为字符串

对象复制 `Object.assign(dest, ...sources)`，`dest` 为结果对象，`sources` 为任意个属性源对象

## 模块

模块即文件

```js
// source.js
// 导出
export function myfun() {
}

// main.js
// 导入
import {myfun} from './source.js';

myfun();
```

此时各模块中的全局变量作用域仅在模块内部，想要跨模块访问必须使用 `export/import` 导入导出

HTML 引入模块时需指定 `type` 属性为 `module`：`<script type="module" src="source.js"></script>`

多次导入
- 模块仅在第一次导入时被执行，后续导入仅可用导出内容，不执行模块代码
- 不同导入引用的是同一个变量，因此更改后所有后续导入都会被更改

对象 `import.meta` 包含有关当前模块的信息

在模块中，`this` 未定义

### 导出导入

命名导出导入

```js
// 声明时导出
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class User {
}

// 声明后导出
function myfunA() {
}

function myfunB() {
}

export {myfunA, myfunB};
export {myfunA as funA, myfunB as funB};
```

```js
// 逐个导入
import {myfunA, myfunB} from './fun.js';
import {fun as userfun} from './user.js';
myfunA()
myfunB()

// 整体导入
import * as fun from './fun.js';
fun.myfunA()
fun.myfunB()
```

默认导出导入

```js
export default class User {
}
```

通常一个文件仅向外暴露一个实体，可以用 `export default` 进行导出
每个文件只能有一个 `export default`，且通常不与命名导出混用
因此，默认导出时也可不指定实体名

```js
export default class {
}
```

导入时才进行命名，且没有大括号
一般约定与文件名同名

```js
import User from './user.js';
```