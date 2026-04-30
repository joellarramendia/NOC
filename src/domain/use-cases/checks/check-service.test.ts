import { jest } from "@jest/globals"
import { CheckService } from "./check-service.js"
import type { LogRepository } from "../../repository/log.repository.js"
import { LogEntity } from "../../entities/log.entity.js"

describe('CheckService UseCase', () => {

    const mockRepository: LogRepository = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }

    const successCallBack = jest.fn()
    const errorCallback = jest.fn()
    
    const checkService = new CheckService(
        mockRepository,
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

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })


    test('should call errorCallBack when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://googleee.com')

        expect(wasOk).toBe(false)
        expect(successCallBack).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})