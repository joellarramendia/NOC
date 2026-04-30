import type { EmailService } from "../../../presentation/email/email-service.js"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js"
import type { LogRepository } from "../../repository/log.repository.js"


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]) {
        try {
            const send = await this.emailService.sendEmailWithFileSystemLogs(to)
            if (!send) {
                throw new Error('Email log not send')
            }

            const log = new LogEntity({
                message: `Log email send`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)
            return false
        }
        return true
    }
}