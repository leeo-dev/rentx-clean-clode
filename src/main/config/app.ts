import express from 'express'
import setupMiddleware from './middlewares'
import setupRouter from './router'
const app = express()
setupMiddleware(app)
setupRouter(app).catch(error => console.error(error))
export { app }
