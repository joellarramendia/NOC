import type { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { SeverityLevel } from "../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level]
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level
            }
        })
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]
        const dbLogs = await prisma.logModel.findMany({
            where: {
                level: level
            }
        })
        return dbLogs.map(dbLog => LogEntity.fromObject(dbLog))
    }

}