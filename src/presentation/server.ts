import { CheckService } from "../domain/use-cases/checks/check-service.js"
import { CronService } from "./cron/cron-service.js"

export class Server {
    static start() {
        console.log('Server started...')
        CronService.createJob(
            '*/5 * * * * *',
            function () {
                const url = 'https://google.com'
               new CheckService(
                () => console.log(`${url} is ok`),
                (error) => console.log(error),
               ).execute(url)
            //    new CheckService().execute('http://localhost:3000')

            },
        )
    }
}

