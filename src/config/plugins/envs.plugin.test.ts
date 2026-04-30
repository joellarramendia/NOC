import {jest} from '@jest/globals'
import { envs } from "./envs.plugin.js"

describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'paraa670@gmail.com',
            MAILER_SECRET_KEY: 'nftstjaubwsmxlmd',
            PROD: false,
            MONGO_URL: 'mongodb://joel:12345678@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'joel',
            MONGO_PASS: '12345678'
        })
    })


    test('should return error if not found env', async () => {
        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('./envs.plugin.js')
            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})