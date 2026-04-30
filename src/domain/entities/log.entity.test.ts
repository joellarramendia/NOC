import { LogEntity, LogSeverityLevel } from "./log.entity.js"

describe('LogEntity', () => {

    const dataObj = {
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)

    })


    test('should create a LogEntity instance from json', () => {

        const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2026-04-29T19:51:50.690Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe("Service https://google.com working")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe("check-service.ts")
        expect(log.createdAt).toBeInstanceOf(Date)

    })


    test('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})