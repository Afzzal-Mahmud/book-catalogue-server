import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { mainRoutes } from './app/routes'
import { handleNotFoundRoute } from './errors/handleNotFound'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// Routes
app.get('/', (req: Request, res: Response) => {
  res.send(`Book Catelog Server running successfully`)
})

// handling all main routes in separate folder to not to polute app.ts
app.use('/api/v1', mainRoutes.routers)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next)
})

// handle page not found
app.use(handleNotFoundRoute)

export default app
