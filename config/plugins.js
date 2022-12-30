module.exports = ({env}) => {
  let upload
  let masterclass
  let commentManager
  let ratings
  let payments
  let usersPermissions
  if (env('NODE_ENV') === 'production') {
    upload = {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    }
    usersPermissions = {
      config: {
        jwtSecret: env('JWT_SECRET')
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
    usersPermissions = {}
  }
  return {
    masterclass,
    ratings,
    "comment-manager": commentManager,
    upload,
    payments,
    'users-permissions': usersPermissions
  }
}
