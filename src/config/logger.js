import simpleLogger from 'simple-node-logger'

const logger = simpleLogger.createSimpleLogger()

export const info = (message) => {
  logger.info(message)
}
