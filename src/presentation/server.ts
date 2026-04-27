import { CheckService } from "../domain/use-cases/checks/check-service.js"
import { SendEmailLogs } from "../domain/use-cases/send-email-logs.js"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js"
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl.js"
import { CronService } from "./cron/cron-service.js"
import { EmailService } from "./email/email-service.js"

const fileSystemLogRespository = new LogRespositoryImpl(
    new FileSystemDatasource(),
)

const emailService = new EmailService()


export class Server {
    static start() {
        console.log('Server started...')

        //Mandar email 
        // new SendEmailLogs(emailService, fileSystemLogRespository).execute([
        //     'amazonpara81@gmail.com'
        // ])
        // emailService.sendEmailWithFileSystemLogs([
        //     'amazonpara81@gmail.com'
        // ])


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     function () {
        //         const url = 'https://google.com'
        //         // const url = 'http://localhost:3000'
        //        new CheckService(
        //         fileSystemLogRespository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.log(error),
        //        ).execute(url)
        //     //    new CheckService().execute('http://localhost:3000')

        //     },
        // )
    }
}

