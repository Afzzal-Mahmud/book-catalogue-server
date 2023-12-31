import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { bookRoutes } from '../modules/book/book.route'

const routers = express.Router()

const moduleRoute = [
  {
    path: '/auth/',
    route: userRoutes.router,
  },
  {
    path: '/users/',
    route: userRoutes.router,
  },
  {
    path: '/books/',
    route: bookRoutes.router,
  },
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
