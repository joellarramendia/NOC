import { envs } from "./config/plugins/envs.plugin.js"
import { MongoDatabase } from "./data/mongo/init.js"
import { LogModel } from "./data/mongo/models/log.model.js"
import { prisma } from "./lib/prisma.js"
import { Server } from "./presentation/server.js"


(async () => {
    main()
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    // Crear una coleccion
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo 2',
    //     origin: 'App.ts',
    //     level: 'medium'
    // })

    // await newLog.save()

    // console.log(newLog)

    // const logs = await LogModel.find()
    // console.log(logs)


    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // })

    // const logs = await prisma.logModel.findMany()
    // console.log(logs)
    // console.log({newLog})


    Server.start()
    // console.log(envs)
}