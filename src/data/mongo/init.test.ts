import mongoose from "mongoose"
import { MongoDatabase } from "./init.js"

describe('init MongoDb', () => {

    afterAll(() => {
        mongoose.connection.close()
    })

    test('should connect to MongoDB', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        })
        expect(connected).toBe(true)
    })

    test('should throw an error', async () => {
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://joel:123456@localhostbase:27017',
            })
            expect(true).toBe(false)
        } catch (error) {

        }
    })
})