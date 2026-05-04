import { jest } from "@jest/globals"
import { LogRespositoryImpl } from "./log.repository.impl.js"
import type { LogRepository } from "../../domain/repository/log.repository.js"
import { LogSeverityLevel, type LogEntity } from "../../domain/entities/log.entity.js"

describe('LogRepositoryImpl', () => {
    const mockLogDataSource = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }
    const logRepository = new LogRespositoryImpl(mockLogDataSource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', async () => {
        const log = {level: LogSeverityLevel.high, message: 'hola'} as LogEntity
        await logRepository.saveLog(log)
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log)
    })


    test('getLogs should call the datasource with arguments', async () => {
        await logRepository.getLogs(LogSeverityLevel.low)
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
    })
})