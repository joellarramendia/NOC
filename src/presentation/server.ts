import { LogSeverityLevel } from "../domain/entities/log.entity.js"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple.js"
import { CheckService } from "../domain/use-cases/checks/check-service.js"
import { SendEmailLogs } from "../domain/use-cases/send-email-logs.js"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js"
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource.js"
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource.js"
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl.js"
import { CronService } from "./cron/cron-service.js"
import { EmailService } from "./email/email-service.js"

const fsLogRespository = new LogRespositoryImpl(
    new FileSystemDatasource(),
)

const mongoLogRespository = new LogRespositoryImpl(
    new MongoLogDataSource(),
)

const postgresLogRespository = new LogRespositoryImpl(
    new PostgresLogDataSource(),
)

const emailService = new EmailService()


export class Server {
    static async start() {
        console.log('Server started...')

        //Mandar email 
        // new SendEmailLogs(emailService, fileSystemLogRespository).execute([
        //     'amazonpara81@gmail.com'
        // ])
        // emailService.sendEmailWithFileSystemLogs([
        //     'amazonpara81@gmail.com'
        // ])

        // const logs = await logRespository.getLogs(LogSeverityLevel.low)
        // console.log(logs)


        CronService.createJob(
            '*/5 * * * * *',
            function () {
                const url = 'https://google.com'
                // const url = 'http://localhost:3000'
               new CheckServiceMultiple(
                [fsLogRespository, mongoLogRespository, postgresLogRespository],
                () => console.log(`${url} is ok`),
                (error) => console.log(error),
               ).execute(url)
            },
        )
    }
}

