import { MessageFilter } from './message_filter'
import { getConfig, defaultConfig, Config } from './config'
import logger from './logger'
import { Level } from 'pino'

import {
  AUTO_RESTART_MS,
  AUTO_CONNECT,
  COMPOSING_MESSAGE,
  UNOAPI_BASE_STORE,
  UNOAPI_RETRY_REQUEST_DELAY,
  IGNORE_CALLS,
  REJECT_CALLS_WEBHOOK,
  WEBHOOK_SESSION,
  WEBHOOK_HEADER,
  WEBHOOK_URL,
  WEBHOOK_TOKEN,
  LOG_LEVEL,
  IGNORE_GROUP_MESSAGES,
  IGNORE_OWN_MESSAGES,
  IGNORE_BROADCAST_STATUSES,
  IGNORE_BROADCAST_MESSAGES,
  IGNORE_HISTORY_MESSAGES,
  IGNORE_YOURSELF_MESSAGES,
  SEND_CONNECTION_STATUS,
  IGNORE_DATA_STORE,
  THROW_WEBHOOK_ERROR,
} from '../defaults'

let config: Config

export const getConfigByEnv: getConfig = async (phone: string): Promise<Config> => {
  if (!config) {
    config = defaultConfig
    config.logLevel = LOG_LEVEL as Level
    config.ignoreGroupMessages = IGNORE_GROUP_MESSAGES
    config.ignoreBroadcastStatuses = IGNORE_BROADCAST_STATUSES
    config.ignoreBroadcastMessages = IGNORE_BROADCAST_MESSAGES
    config.ignoreHistoryMessages = IGNORE_HISTORY_MESSAGES
    config.ignoreDataStore = IGNORE_DATA_STORE
    config.ignoreYourselfMessages = IGNORE_YOURSELF_MESSAGES
    config.ignoreOwnMessages = IGNORE_OWN_MESSAGES
    config.sendConnectionStatus = SEND_CONNECTION_STATUS
    config.autoConnect = AUTO_CONNECT
    config.autoRestartMs = AUTO_RESTART_MS
    config.composingMessage = COMPOSING_MESSAGE
    config.baseStore = UNOAPI_BASE_STORE
    config.rejectCalls = IGNORE_CALLS
    config.throwWebhookError = THROW_WEBHOOK_ERROR
    config.rejectCallsWebhook = REJECT_CALLS_WEBHOOK
    config.retryRequestDelayMs = UNOAPI_RETRY_REQUEST_DELAY
    config.sessionWebhook = WEBHOOK_SESSION
    config.webhooks[0].url = WEBHOOK_URL
    config.webhooks[0].token = WEBHOOK_TOKEN
    config.webhooks[0].header = WEBHOOK_HEADER
    const filter: MessageFilter = new MessageFilter(phone, config)
    config.shouldIgnoreJid = filter.isIgnoreJid.bind(filter)
    config.shouldIgnoreKey = filter.isIgnoreKey.bind(filter)
    logger.info('Config by env: %s -> %s', phone, JSON.stringify(config))
  }
  return config
}
