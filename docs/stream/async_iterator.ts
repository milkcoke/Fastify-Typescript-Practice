import {promisify} from 'util';
const sleep = promisify(setTimeout);

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield
// What's '*' in front of function name?
// Return `Generator` object function
// Generator object makes iterable protocol or iterator protocol
async function * generateReadableStream() {
    for (let i = 1; i <= 32; i++) {
        // What's yield keyword?
        yield i;
    }
}

// The iterable protocol: Allow iteration operation (ex. for .. of)
// The iterator protocol: Define the way of making value sequence keeping the iterable protocol
// If object has `next()` method and returns object which has `done` and `value` properties


// String is iteration protocol since it has `next()` method and returns a character
const str = 'TypeScript';
const iterator = str[Symbol.iterator]();

for (let i = 0; i <= str.length ; i++) {
    // value: next return value
    // done: Is last element of the iterator protocol?
    console.log(iterator.next());
}

// Need to construct a String object explicitly to avoid auto-boxing
const str2 = new String('Javascript');
str2[Symbol.iterator] = function () {
    return {
        _first: true,
        // 여기서 arrow function 하면 또 안먹네 아 ㅋㅋ ㅅㅂ 진짜 대체 끝이없냐
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

async function print() {
    // when to use await in for loop?
    // What's asyncIterator..?
    for await (const chunk of generateReadableStream()) {
        await sleep(100);
        console.log(chunk);
    }
}

// print();