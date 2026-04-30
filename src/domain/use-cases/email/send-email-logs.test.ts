import { jest } from "@jest/globals"
import { SendEmailLogs } from "./send-email-logs.js"
import type { EmailService } from "../../../presentation/email/email-service.js"
import type { LogRepository } from "../../repository/log.repository.js"
import { LogEntity } from "../../entities/log.entity.js"

describe('SendEmailLogs', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn<() => Promise<boolean>>().mockResolvedValue(true)
    }

    const mockRepository: LogRepository = {
        saveLog: jest.fn<LogRepository['saveLog']>().mockResolvedValue(undefined),
        getLogs: jest.fn<LogRepository['getLogs']>().mockResolvedValue([])
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository,
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute('amazonpara81@gmail.com')
        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email send",
            "origin": "send-email-logs.ts",
        })
    })


    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const result = await sendEmailLogs.execute('amazonpara81@gmail.com')
        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not send",
            "origin": "send-email-logs.ts",
        })
    })
})