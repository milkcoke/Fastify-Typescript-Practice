import {FastifyInstance} from "fastify";
import {build} from "../mockBuilder";
import {createBook, createMockBooks} from "@controllers/books/book";
import {bookModel} from "../../src/models/books/Book";

// https://www.youtube.com/watch?v=beY0sn-XgtY
// https://stackoverflow.com/questions/59965807/how-to-mock-fastify-plugin
// jest.mock('fastify');

// jest.mock('../mockServer');
// jest.mock('../mockBuilder');


// req, res obj 생성을 위한 모듈

/* TODO
     - List up to do list
     - Write the test code
     - Implementation.
*/

// mock 함수 호출
// 어떤것과 함께 호출되는지 알 수 있음.
bookModel.create = jest.fn();



describe('Create mock books', ()=> {

    let mockApp: FastifyInstance;
    // 이 describe 내에서만 실행
    // beforeEach(()=>{
    //     req.body = books100[0];
    // });

    beforeAll(async ()=>{
        mockApp = build();
    });

    afterAll(async ()=>{
        await mockApp.close();
    });

    // 테스트 케이스를 먼저 쓰고 테스트를 통과하는 방어적인 코드 작성
    test('100 books should be created', async () => {
        expect(typeof createMockBooks).toBe('function');
    });

    test('Should be called bookModel.create', () => {
        createMockBooks();
        // 실제 모델이 함수를 호출하는지 체크
        expect(bookModel.create).toBeCalled();
    });



    // done call back can be passed in jest test parameter
    test('Should return 200 when app is healthy', async () => {
        const res = await mockApp.inject({
            method: 'GET',
            url: '/books',
        });

        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.payload)).toEqual({
            hello: 'world'
        });
        // expect(res.statusCode).toEqual(200);
    });

});