/* eslint-disable import/first */
require('module-alias/register')
import { MongooseHelper } from '@/infra/mongodb/helpers/mongoose-helper'
import env from './config/env'
import { app } from '@/main/config/app'
MongooseHelper.connectDb(env.mongoUrl).then(() => {
  app.listen(3000, () => console.log('Server is running!'))
}).catch(error => console.log(error))
