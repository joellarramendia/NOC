import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin.js'
import path from 'node:path'
import type { LogRepository } from '../../domain/repository/log.repository.js'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.js'

interface SendEmailOptions {
    to: string | string[]
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

interface Attachment {
    filename: string
    path: string
}


// todo attachments

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
        private readonly logRespository: LogRepository
    ){}

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            // console.log(sendInformation)
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email send',
                origin: 'email.service.ts'
            })
            this.logRespository.saveLog(log)
            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not send',
                origin: 'email.service.ts'
            })
            this.logRespository.saveLog(log)
            return false
        }
    }


    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Tempor amet fugiat ipsum dolor velit excepteur sit occaecat amet minim magna ipsum officia. Pariatur ullamco laborum aute aliqua commodo nostrud esse ad. Fugiat pariatur do est fugiat qui aute id pariatur.</p>
            <p>Ver logs adjuntos</p>
        `

        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'}

        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }
}