module.exports = ({env}) => {
  let upload
  let masterclass
  let commentManager
  let ratings
  let payments
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
    ratings = {
      enabled: true,
      resolve: './src/plugins/strapi-plugin-ratings'
    }
    commentManager = {
      enabled: true,
      resolve: './src/plugins/comment-manager'
    }
    payments = {
      enabled: true,
      resolve: './src/plugins/strapi-plugin-payments'
    }
  }
  return {
    masterclass,
    ratings,
    "comment-manager": commentManager,
    upload,
    payments
  }
}