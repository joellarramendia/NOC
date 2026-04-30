import mongoose from "mongoose"
import { envs } from "../../../config/plugins/envs.plugin.js"
import { MongoDatabase } from "../init.js"
import { LogModel } from "./log.model.js"

describe('log.model.test.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test('should return LogModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        } as const

        const log = await LogModel.create(logData)

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))

        await LogModel.findByIdAndDelete(log.id)
    })


    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: expect.objectContaining({ type: expect.any(Function) }),
            origin: expect.objectContaining({ type: expect.any(Function) }),
            level: expect.objectContaining({
                type: expect.any(Function),
                enum: ['low', 'medium', 'high'],
                default: 'low'
            }),
            createdAt: expect.objectContaining({
                type: expect.any(Function),
                default: expect.any(Date)
            })
        }));
    });
})