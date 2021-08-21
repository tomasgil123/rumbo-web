// src/mocks/handlers.js
import { rest } from 'msw'
export const handlers = [
  rest.post('http://18.207.73.190/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        refresh:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MjA3MTA1MDM3OCwianRpIjoiM2ZhMjA3Nzc4MTk5NDRmOGJhYWFkNzNmNTE4MDQ0YTgiLCJ1c2VyX2lkIjo0MjN9.r0_30SKhrzn_0-wxVD0_9TvAHBQ68AAjsA_fAUx3bsM',
        access:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxODUwMjk4Mzc4LCJqdGkiOiJkYWFjZTFiNjlhMjY0MzNiOGFhM2MwYjM0MGE1MzVhMCIsInVzZXJfaWQiOjQyM30.VamEWBNBQ471CjPeEv3ywlvaqdPC0qhl74PESys91Ag',
      })
    )
  }),
]
