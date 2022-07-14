
## Node.js stream
The stream is instance of `EventEmitter`. \
when data I/O occurs, It emits event.

## Types of stream.
- Readable
- Writable
- Duplex
- Transform \
Duplex stream, modified data when I/O occurs.

### example

| Readable Stream               | Writable Stream                |
|-------------------------------|--------------------------------|
| HTTP responses, on the client | HTTP requests, on the client   |
| HTTP requests, on the server  | HTTP responses, on the server  |
| fs read streams               | fs write streams               |
| process.stdin                 | process.stdout, process.stderr |


### pipe()
Source: Readable Stream \
Destination: Writable Stream

#### Without pipe
```typescript
import {readFile} from 'fs';

const server = require('http').createServer();

server.on('request', (req, res)=>{
    readFile('./file.mp4', (err, data)=>{
        if (err) throw err;
        // ⚠️ memory explode!!!
        // all file data is buffered on memory/
        res.end(data);
    })

});
```
#### With pipe
```typescript
import {createReadStream} from 'fs';

const server = require('http').createServer();

server.on('request', (req, res)=>{
    const readableStream = createReadStream('./file.mp4');
    // pipe stream from readable stream to writable stream.
    readableStream.pipe()
});
```

## Event handling

| Event    | Readable Stream               | Writable Stream             |
|----------|-------------------------------|-----------------------------|
| `data`   | when chunk is transferred     |                             |
| `end`    | Not exist more data in stream |                             |
| `drain`  |                               | There's more data consumed. |
| `finish` |                               | All data is flushed         |


## Readable Stream Mode
#### Pause mode (Pull)
**Default, all readable stream start in this mode.** \
Sometimes switched to flow mode automatically.

#### Flow mode (push)
If there's no consumer, data should be vanished. \
So always use `data` event handler when to use this. \
If don't, switched to pause mode.

> 📝 Using `pipe()` method, You don't need care about it!. \
> pipe will manage it itself.
---

## 🔗 Reference
- [Stream everything you have to know - fedevelopers](https://fedevelopers.github.io/tech.description/node-js-stream-everything-you-have-to-know/)