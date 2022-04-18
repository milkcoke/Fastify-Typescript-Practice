/*
    Mocking is a technique replacing mock objects by replacing original function or modules.
    Separate original app and mocking function and modules for testing
    - fn: Mock a function
    - mock: Mock a module
    - spyOn: Spy or mock a function.
 */

import {heathCheckRoute} from '../healthChecker';
import {build} from "../mockBuilder";


describe('Mock test', ()=>{
    const app = build();
    test('Should return 200 when app is running', async ()=>{
        const healthCheckRes = await app.inject({
            method: 'GET',
            url: '/healthCheck'
        });

        expect(healthCheckRes.statusCode).toStrictEqual(200);
        // Default payload is JSON string
        expect(JSON.parse(healthCheckRes.payload).healthCheck).toBeTruthy()
    })
})