

## Writable Stream
```typescript
const outStream = new Writable({
    write(chunk, encoding, callback) {
        // chunk is normally buffer
        console.log(chunk.toString());
        // if error exists, pass error object to callback function.
        callback();
    }
});

// echo!
process.stdin
    .pipe(outStream);

// Can be summarized in one line.
process.stdin
    .pipe(process.stdout);

```

## Readable Stream
```typescript
const inStream = new Readable({
    // implement required `read` method
    read(size: number): void {
        // push buffer alphabet one by one when Uppercase in by Z pushed.
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push('\n');
            this.push(null); // no more data to be consumed. (end of stream)
        }
    }
});

// ASCII CODE 65 is 'A'
inStream.currentCharCode = 65;

inStream
    .pipe(process.stdout);
```


## Duplex Stream
```typescript
const inoutStream = new Duplex({
    // Operate isolated Readable stream and Writable stream.
    // Duplex stream is just grouping both.
    write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        console.log(chunk.toString());
        callback();
    },

    read(size: number) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push('\n');
            this.push(null);
        }
    }
});

inoutStream.currentCharCode = 65;

process.stdin
    .pipe(inoutStream)
    .pipe(process.stdout);
```


## Transform Stream
**Transform stream can pass using `callback()` method** \
1st argument is error, 2nd is data (chunk);

```typescript
const upperCaseTransform = new Transform({
    // Don't need implementing read() write() methods.
    // Transform stream already has both signature.
    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        
        this.push(chunk.toString().toUpperCase());
        callback(null);

        // ✅ 1st : error, 2nd: data (pass to next stream piped)
        // 2 line above code can be summarized in next one line
        // callback(null, chunk.toString().toUpperCase());
    }
});

process.stdin
    .pipe(upperCaseTransform)
    .pipe(process.stdout);
```


## Stream Object Mode
```typescript
const commaSplitter = new Transform({
    readableObjectMode: true,

    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        this.push(chunk.toString().trim().split(','));
        callback();
    }
});

const arrayToObject = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const obj = {};
        console.log(chunk.length);
        for (let i = 0; i < chunk.length; i += 2) {
            obj[chunk[i]] = chunk[i+1];
        }
        // {key : value} 한 쌍 씩
        this.push(obj);
        callback();
    }
});

const objectToString = new Transform({
    writableObjectMode: true,

    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        this.push(JSON.stringify(chunk) + '\n');
        callback();
    }
});

process.stdin
    .pipe(commaSplitter)
    .pipe(arrayToObject)
    .pipe(objectToString)
    .pipe(process.stdout);

```