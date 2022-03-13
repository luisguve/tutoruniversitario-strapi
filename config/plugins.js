module.exports = ({env}) => {
  let upload
  let masterclass
  if (env('NODE_ENV') === 'production') {
    upload = {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET')
          }
        }
      }
    }
  } else {
    masterclass = {
      enabled: true,
      resolve: './src/plugins/masterclass'
    }
  }
  return {
    masterclass,
    upload
  }
}