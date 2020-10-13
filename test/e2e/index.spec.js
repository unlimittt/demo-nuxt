import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

test.before(async (t) => {
  const rootDir = resolve(__dirname, '../../')
  const config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir
  config.dev = false
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  t.context.nuxt = nuxt
  t.context.prefixUrl = await nuxt.server.listen(4000, 'localhost')
}, 30000)

test.after('Closing server and nuxt.js', (t) => {
  t.context.nuxt.close()
})

test('Route / exist and render HTML', async (t) => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.snapshot(html)
  t.true(html.includes('Documentation'))
})
