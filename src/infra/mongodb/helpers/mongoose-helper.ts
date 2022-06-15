import { connect, Mongoose } from 'mongoose'
export const MongooseHelper = {
  client: null as unknown as Mongoose,
  async connectDb (uri: string) {
    this.client = await connect(uri)
  },
  async disconnectDb () {
    await this.client.disconnect()
  },
  map (data: any): any {
    const { _id, ...collectionWithoutId } = data?._doc
    return Object.assign({}, collectionWithoutId, { id: String(_id) })
  }
}
