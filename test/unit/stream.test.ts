import {createReadStream, createWriteStream, Stats} from "fs";
import {stat} from "fs/promises";
import path from 'path';
import {createGzip} from 'zlib';
import {Transform, TransformCallback} from "stream";

describe('Node.js stream test', ()=>{
    let testFilePath = path.join(__dirname, '../..', 'public', 'keyboard_vamilo.mp4');
    let fileSavePath = path.join(__dirname, '../..', 'public', 'write.mp4');
    let originalFileStat: Stats;

    beforeAll(async ()=>{
        originalFileStat = await stat(testFilePath);
    });

    test('make readable stream', (done)=>{
        let fileSize = 0;

        const readableStream = createReadStream(testFilePath);

        readableStream.pipe(createWriteStream(fileSavePath));

        readableStream.on('data',(chunk)=>{
            fileSize += Buffer.byteLength(chunk);
        });

        readableStream.on('end', ()=>{
            console.log('file end!');
            console.log(fileSize);
            console.log(originalFileStat.size)
            expect(fileSize).toEqual(originalFileStat.size)
            done();
        })

    });

    test('zlib stream',(done)=>{
        const reportProgress = new Transform({
            transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
                process.stdout.write('=');
                // error : null, data: chunk
                callback(null, chunk);
            }
        });

        createReadStream(testFilePath)
            // createGzip return Gzip
            // 👉🏻 interface Gzip extends stream.Transform, Zlib {}
            // Gzip extends Transform stream!
            .pipe(createGzip())
            .pipe(reportProgress)
            .pipe(createWriteStream(path.join(path.dirname(fileSavePath), path.basename(fileSavePath, '.mp4') + '.gz')))
            .on('finish',()=>{
                console.log('Complete!');
                done();
            });


    })
})