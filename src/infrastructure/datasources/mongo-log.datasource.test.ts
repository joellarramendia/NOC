import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin.js"
import { MongoDatabase } from "../../data/mongo/init.js"
import { MongoLogDataSource } from "./mongo-log.datasource.js"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js"
import { jest } from "@jest/globals"
import { LogModel } from "../../data/mongo/models/log.model.js"

describe('mongo-log.datasource.test', () => {
    const logDataSource = new MongoLogDataSource()

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany()
    })

    afterAll(async () => {
        await LogModel.deleteMany()
        mongoose.connection.close()
    })

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')



        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String))
    })

    test('should get logs', async () => {
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.medium)

        expect(logs.length).toBe(1)
        expect(logs[0]?.level).toBe(LogSeverityLevel.medium)
    })
})