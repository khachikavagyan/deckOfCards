import mongoose from 'mongoose'
import { TEST_DB_URI } from '../../config/config'

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
  })

  beforeEach(async () => {
    mongoose.connection.dropDatabase();
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
}

export default setupTestDB
