// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3
import express from "express"
import * as http from 'http'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from "debug"

import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import { CommonRoutesConfig } from "./common/common.routes.config"
import { UsersRoutes } from "./users/users.routes.config"
import { AuthRoutes } from "./auth/auth.routes.config"
import { AdRoutes } from "./ad/ad.routes.config"
import { VideoRoutes } from "./video/video.routes.config"

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3001
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

app.use(express.json())
app.use(cors())

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
}

if (!process.env.DEBUG) {
  loggerOptions.meta = false // when not debugging, log requests as one-liners
  /*if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }*/
}

app.use(expressWinston.logger(loggerOptions))
routes.push(new AuthRoutes(app)) // independent: can go before or after UsersRoute
routes.push(new UsersRoutes(app))
routes.push(new AdRoutes(app))
routes.push(new VideoRoutes(app))

const runningMessage = `Server running at http://localhost:${port}`

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
})

export default server

server.listen(port, () => {
  debugLog('in')
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })

  console.log(runningMessage)
})