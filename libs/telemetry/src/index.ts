import { S3 } from 'aws-sdk'

export function instances() {
  return {
    s3: new S3({
      apiVersion: '2006-03-01',
    }),
  }
}

// TODO: Add context about userId, productId, etc.. to find out most request products. Use it for personalization
export function recordMetricEvent(
  eventSource: string,
  eventAction: string,
  duration: number,
  type: string
): void {
  const metricEvent = {
    source: eventSource,
    type,
    action: eventAction,
    duration,
    timestamp: new Date().toISOString().substr(0, 19).replace('T', ' '),
  }

  const currentTime = Math.floor(Date.now() / 1000).toString()

  instances().s3.upload(
    {
      Bucket: String(process.env.TELEMETRY_BUCKET_NAME),
      Key: `${eventSource}/${currentTime}`,
      Body: JSON.stringify(metricEvent),
    },
    (err, data) => {
      if (err) {
        console.error({
          message: 'Failed uploading metric event',
          error: err.message,
        })
      }

      if (data) {
        console.info({
          message: 'Uploaded metric event',
          location: data.Location,
        })
      }
    }
  )
}
