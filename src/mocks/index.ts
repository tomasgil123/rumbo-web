/* eslint-disable @typescript-eslint/no-var-requires */
if (typeof window !== 'undefined') {
  const { worker } = require('./browser')
  worker.start()
}
export {}
