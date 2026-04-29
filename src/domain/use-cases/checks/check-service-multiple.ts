import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js"
import type { LogRepository } from "../../repository/log.repository.js"

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = (() => void) | undefined
type ErrorCallBack = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRespository : LogRepository[],
        private readonly successCallback: SuccessCallBack,
        private readonly errorCallback: ErrorCallBack
    ) { }

    private callLogs(log:LogEntity){
        this.logRespository.forEach(logRespository => {
            logRespository.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }
            const log = new LogEntity({
                message:`Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })
            this.callLogs(log)
            this.successCallback && this.successCallback()
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            })
            this.callLogs(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }
    }
}