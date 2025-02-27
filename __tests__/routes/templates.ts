import request from 'supertest'
import { mock } from 'jest-mock-extended'

import { App } from '../../src/app'
import { Incoming } from '../../src/services/incoming'
import { Outgoing } from '../../src/services/outgoing'
import { getStore, Store } from '../../src/services/store'
import { Config, getConfig } from '../../src/services/config'
import { DataStore } from '../../src/services/data_store'
import { Client, getClient } from '../../src/services/client'

const client = mock<Client>()
const store = mock<Store>()
const config = mock<Config>()
const dataStore = mock<DataStore>()
const getConfig = mock<getConfig>()

const loadTemplates = jest.spyOn(dataStore, 'loadTemplates')
loadTemplates.mockResolvedValue([])
const getStore = jest.spyOn(config, 'getStore')
getStore.mockResolvedValue(store)
store.dataStore = dataStore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getConfigTest: getConfig = async (_phone: string) => {
  return config
}
const getClientTest: getClient = async ({ phone, incoming, outgoing, getConfig, onNewLogin }) => {
  return client
}

describe('templates routes', () => {
  test('index', async () => {
    const incoming = mock<Incoming>()
    const outgoing = mock<Outgoing>()
    const app: App = new App(incoming, outgoing, '', getConfigTest, getClientTest)
    const res = await request(app.server).get('/v15.0/123/message_templates')
    expect(res.status).toEqual(200)
  })
})
