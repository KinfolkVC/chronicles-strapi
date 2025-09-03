export default ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            ACL: env("AWS_ACL", "public-read"), // <== set ACL to private
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("SENDGRID_FROM_EMAIL"),
        testAddress: env("SENDGRID_FROM_EMAIL"),
      },
    },
  },
  "users-permissions": {
    // Other user-permissions configurations
    // ...
    populateCreatorFields: true, // populate author/creator fields
  },
});
