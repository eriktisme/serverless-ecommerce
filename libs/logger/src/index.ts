import { S3 } from 'aws-sdk'

export function instances() {
  return {
    s3: new S3({
      apiVersion: '2006-03-01',
    }),
  }
}

export function log(
  eventSource: string,
  message: { [key: string]: any }
): void {
  if (process.env.NODE_ENV === 'prod') {
    // TODO: Send to cloudwatch/S3?
    const currentTime = Date.now()
    message['timestamp'] = new Date()
      .toISOString()
      .substr(0, 19)
      .replace('T', ' ')

    instances().s3.upload(
      {
        Bucket: String(process.env.LOGS_BUCKET_NAME),
        Key: `${eventSource}/${currentTime}`,
        Body: JSON.stringify(message),
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

    return
  }

  console.debug({ ...message })
}
