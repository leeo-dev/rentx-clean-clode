/* eslint-disable import/first */
require('module-alias/register')
import { app } from '@/main/config/app'
app.listen(3000, () => console.log('Server is running!'))
