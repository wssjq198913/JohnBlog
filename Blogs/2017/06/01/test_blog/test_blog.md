### 方法1：通过原型链
这种模式的问题是Dog的所有实例共享同一个Animal实例，一旦在dog1种修改Animal属性，dog2种的Animal属性也被修改，这是我们不想看到的，因尔这种继承并不实用。
```
function Animal(){
    this.Age = null;
    this.Name = null;
}

Animal.prototype.Eat = function(){
    console.log(this.Name + ' eat')
}

function Dog(){
    this.Species = null;
}

Dog.prototype = new Animal();

var dog = new Dog();
dog.Eat()
console.log(dog);
```

### 方法2：通过call 改变this
但是这种方法仍然不完美， 每个Dog的实例中都有Eat方法，我们希望方法对于每个实例都是共享的，而不是每个实例都有一样的方法。
```
function Animal(age, name){
    this.Age = age;
    this.Name = name;
    this.Eat = function(){
        console.log(this.Name + ' eat');
    }
}

function Dog(species, age, name){
    this.Species = species;
    Animal.call(this, age, name);
}

var dog = new Dog('博美', '5', 'Jim');
console.log(dog);
```

### 方法3：组合继承模式
这种方法结合了方法1和方法2。用原型链实现方法的继承，在构造函数中实用call来实现属性的继承。这种方式基本完美，但是我们发现构造方法Animal被调用2次，对于追求精益求精的我们，希望有更加完美的实现。
```
function Animal(age, name){
    this.Age = age;
    this.Name = name;
}

Animal.prototype.Eat = function(){
    console.log(this.Name + ' eat');
}

function Dog(species, age, name){
    this.Species = species;
    Animal.call(this, age, name);   //第二次调用Animal()
}

Dog.prototype = new Animal();  // 第一次调用Animal()

var dog = new Dog('博美', '5', 'Jim');
dog.Eat();
console.log(dog);
```

### 方法4：寄生组合继承模式
属性通过call， 方法通过原型链，但是这种方法不会调用2次Animal()， 这种方式去掉了Animal中多余的Age和Name属性又完美的保留的与原型链。
```
// Object.create的非规范实现
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritPrototype(son, father) {
    var prototype = Object.create(father.prototype)
    // Object.create的实现参考上面的object

    prototype.constructor = son;
    // 通过Object.create生成的prototype没有constructor， 
    // 所以要弥补son一个constructor

    son.prototype = prototype;
}

function Animal(age, name){
    this.Age = age;
    this.Name = name;
}

Animal.prototype.Eat = function() {
    console.log(this.Name + ' eat');
}

function Dog(species, age, name){
    this.Species = species;
    Animal.call(this, age, name);
}

inheritPrototype(Dog, Animal);

Dog.prototype.Cry = function(){
    console.log(this.Name + ' cry');
}

var dog = new Dog('博美', '5', 'Jim');
dog.Eat();
dog.Cry();

```