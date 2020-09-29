我们可以通过`in`来判断，一个对象是否拥有某一个属性/方法：

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}

var p = new Person('jack', 20);

console.log('name' in p); // true
```

`in`的这种特性最常用的场景之一，就是判断当前页面是否在移动端打开。

```javascript
isMobile = 'ontouchstart' in document;
```

当然用浏览器`UA`的方式也可以判断，如果user-agent中包含Mobile，则为移动端，但`in`这种方式更简单、专业。