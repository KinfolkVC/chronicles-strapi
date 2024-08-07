const axios = require("axios");
const path = require("path");

module.exports = {
  // async afterCreate(event) {
  //   const { result, params } = event;
  //   // console.log(params, "eventtt from post/lifecycles 1");

  //   // try {
  //   //   if (result.publishedAt === null) {
  //   //     // Check if the post is a already published
  //   //     console.log(result, "eventtt from post/lifecycles 2");
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // },
  async afterUpdate(event) {
    const { result, params } = event;

    // Fetch the featured image from the URL
    // const imageFetchResponse = await axios.get(`${result.emailBanner.url}`, {
    //   responseType: "arraybuffer",
    // });
    // const imageBase64 = Buffer.from(imageFetchResponse.data).toString("base64");
    // const imageCid = "inline-image";

    if (result.pushToSubscribers === true) {
      try {
        // Fetch all subscribers
        // @ts-ignore
        const subscribers = await strapi.entityService.findMany(
          "api::subscriber.subscriber"
        );



        // Send an email to each subscriber
        for (const subscriber of subscribers) {
          const unsubscribeUrl = `http://localhost:3000/unsubscribe?id=${subscriber.id}`;
          // Define email body format
          const subject = `Chronicles: ${result.emailTitle}`;
          // const text = `A new post has been published: ${result.title}. Read more at: blog.com/posts/${result.id}`;
          // <img src="cid:${imageCid}" style="width: 100%; height: auto; max-width: 100%; padding-top: 1rem; border-radius: 30px;" alt="Image">
          const html = `
            <html>
              <head>
                <style>
                body {font-weight: 400; width: 100%;}
                h1, h2, h3, h4, h5, h6 {color: black;}
                p {color: black;}
                .mainContent {font-size: 16px; font-weight: 400}
                img {width:100%; height: auto; max-width: 99%; border-radius: 10px;}
                .emoji img {width:21px!important; height: 21px!important;}
                </style>
              </head>
              <body>
                <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 1rem;">${result.title}</h1>
                <div class="mainContent">${result.emailContent}</div>
                <p style="margin-top: 0.5rem;">See more articles <a style="font-style: italics;" href="https://chronicles.kinfolk.vc/" target="_blank">here</a></p>
                <p>If you no longer wish to receive these emails, you can <a href="${unsubscribeUrl}">unsubscribe here</a>.</p>
              </body>
            </html>
          `;
          // @ts-ignore
          await strapi.plugins["email"].services.email.send({
            to: subscriber.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: subject,
            // text: text,
            html: html,
            headers: {
              "X-Priority": "5",
              "X-MSMail-Priority": "Low",
              Importance: "Low",
              Priority: "bulk",
              Precedence: "bulk",
              "X-Mailer": "SendGrid-Mail",
              "X-Campaign": "Promotions",
            },
            // attachments: [
            //   {
            //     content: imageBase64,
            //     filename: path.basename(result.emailBanner.name),
            //     type: "image/webp", // or 'image/png' based on your image type
            //     disposition: "inline",
            //     content_id: imageCid,
            //   },
            // ],
          });
        }
      } catch (error) {
        // @ts-ignore
        strapi.log.error("Failed to send email notifications:", error);
        console.error(
          "Failed to send email notifications:",
          error,
          error.response.body.errors
        );
      }
    }
  },
};
