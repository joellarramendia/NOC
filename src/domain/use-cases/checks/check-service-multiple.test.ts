import { jest } from "@jest/globals"
import { CheckServiceMultiple } from "./check-service-multiple.js"
import type { LogRepository } from "../../repository/log.repository.js"
import { LogEntity } from "../../entities/log.entity.js"

describe('CheckService UseCase', () => {

    const mockRepo1: LogRepository = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }

    const mockRepo2: LogRepository = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }

    const mockRepo3: LogRepository = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }

    const successCallBack = jest.fn()
    const errorCallback = jest.fn()
    
    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        successCallBack,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('should call successCallBack when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)
        expect(successCallBack).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })


    test('should call errorCallBack when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://googleee.com')

        expect(wasOk).toBe(false)
        expect(successCallBack).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})