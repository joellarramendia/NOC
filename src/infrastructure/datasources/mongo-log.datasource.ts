import { LogModel } from "../../data/mongo/models/log.model.js";
import type { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.js";


export class MongoLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log)
        console.log('Mongo Log created:', newLog.id)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog))
    }

}