'use strict'

const http = require('https')

exports.handler = async (event, _, callback) => {
  console.log({
    message: 'Event received',
  })

  const cf = event.Records[0].cf

  let response

  try {
    const responses = await Promise.all([
      httpGet({
        hostname: cf.config.distributionDomainName,
        path: 'index.html',
      }),
    ])

    const html = responses[0]

    response = {
      status: '200',
      headers: addSecurityHeaders({
        'content-type': [{ value: 'text/html;charset=UTF-8' }],
      }),
      body: html,
    }
  } catch (e) {
    response = {
      status: '500',
      headers: addSecurityHeaders({
        'content-type': [{ value: 'application/json' }],
      }),
      body: JSON.stringify(e, null, 2),
    }
  }

  console.debug({
    message: 'Sending response',
    response: JSON.stringify(response),
  })

  return callback(null, response)
}

function httpGet(params) {
  return new Promise((resolve, reject) => {
    http
      .get(params, (response) => {
        console.log({
          message: 'Successfully fetched', // TODO: Improve message
          hostname: params.hostname,
          path: params.path,
          statusCode: response.statusCode,
        })

        let data = ''
        response.on('data', (chunk) => (data += chunk))
        response.on('end', () => resolve(data))
      })
      .on('error', (err) => {
        console.error({
          message: 'Failed fetching',
          hostname: params.hostname,
          path: params.path,
          error: err.message,
        })

        reject(err, null)
      })
  })
}

function addSecurityHeaders(headers) {
  headers['strict-transport-security'] = [
    { value: 'max-age=31536000; includeSubDomains' },
  ]
  headers['content-security-policy'] = [{ value: "default-src 'self'" }]
  headers['x-xss-protection'] = [{ value: '1; mode=block' }]
  headers['x-content-type-options'] = [{ value: 'nosniff' }]
  headers['x-frame-options'] = [{ value: 'DENY' }]

  return headers
}
