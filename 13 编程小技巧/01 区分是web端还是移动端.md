我们可以通过`in`来判断，一个对象是否拥有某一个属性/方法，无论是该属性/方法存在与实例对象还是原型对象

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('jack', 10);

console.log('name' in p1); // true
```

`in`的这种特性最常用的场景之一，就是判断当前页面是否在移动端打开。

```javascript
isMobile = 'ontouchstart' in document;
```

很多人喜欢用浏览器`UA`的方式来判断，但并不是很好的方式

