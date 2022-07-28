
## Example Code
```typescript
// What's '*'?
async function * generateAsyncIterator() {
    for (let i = 1; i <= 32; i++) {
        // What's `yield` keyword?
        yield i;    
    }
}

async function readAsyncIterator() {
    // What's made from generateAsyncIterator?
    for await (const element of generateAsyncIterator()) {
        console.log(i);
    }
    // [Print Result]
    // 1
    // 2
    // ..
    // 32
}
```


### What's `*` in front of function?
It means "_This is the function returning `Generator object`_"

### What's `yield` kewyord?
Use `yield` when to resume or stop the `Generator object` \
yield return `IteratorResult` which consists of `{value, done}`

### Generator object?
It's object keeping the rule of iterable protocol and iterator protocol 

### iterator protocol?
Allow iteration operation (ex. `for .. of`)

### iterator protocol?
Object has `next()` method and returns `done` (boolean) and `value`. 
- If last element (no more next element) => `{done: true, value: undefined}`
- else => `{done: false, value: next element}`


## Example iterator protocol
#### Sneak peek iterator
```typescript
const str = 'TypeScript';
const strIterator = str[Symbol.iterator]();
// continue the loop until no more next() element, done: true
for (let i = 0; i < str.length ; i++) {
    // value: next return value
    // done: Is last element of the iterator protocol?
    console.log(strIterator);
}
```

![Iterator test](./iterator_test.png?raw=true "Iterator test code result")

### Define custom `next()`
```typescript
str2[Symbol.iterator] = function () {
    return {
        _first: true,
        // Would not work using arrow function  
        next: function (){
            if (this._first) {
                this._first = false;
                return {value: 'TypeScript', done: false}
            } else {
                return {done: true}
            }
        }
    }
}

console.log(...str2);
// [print]
// `Typescript`
```


---
## 🔗 Reference
- [yield - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield)
- [function * - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
- [Iteration - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)