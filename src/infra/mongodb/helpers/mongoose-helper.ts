import { connect, Mongoose } from 'mongoose'
export const MongooseHelper = {
  client: null as unknown as Mongoose,
  async connectDb (uri: string) {
    this.client = await connect(uri)
  },
  async disconnectDb () {
    await this.client.disconnect()
  }
}
