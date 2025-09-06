
import { Resend } from 'resend';

export default {
  async afterCreate(event) {
    const { result, params } = event;

    // Check if the result contains a valid email
    if (result && result.email.length > 0) {
      try {
        const emailTemplate = await strapi.db.query('api::new-subscriber-email-template.new-subscriber-email-template').findOne({
          where: { activeTemplate: { $notNull: true } }, // only active template
        });

        // @ts-ignore
        const subscriber = result;

        // Send an email to new subscriber
        const unsubscribeUrl = `https://chronicles.kinfolk.vc/unsubscribe?id=${ subscriber.id }`;
        // Define email body format
        const subject = `Welcome to Kinfolk`;
        const html = `
            <html>
              <head>
                <style>
                body {font-weight: 400; width: 100%;}
                h1, h2, h3, h4, h5, h6 {color: black;}
                p {color: black;}
                ol, ul {padding-left: 1rem;}
                .mainContent {font-size: 16px; font-weight: 400}
                img {width:100%; height: auto; max-width: 99%; border-radius: 10px;}
                .emoji img {width: 21px!important; height: 21px!important;}
                .banner {background-color: black; width: 100%; height: 100px; display: flex; margin-bottom: 40px; overflow:hidden;}
                .banner img {margin: auto auto; width: auto!important;}
                .cta-container {margin-top: 30px; display: flex;}
                .cta-container a {background-color: black; color: white; padding: 13px 16px!important; border: none; margin: 0 auto; margin-bottom: 20px;border-radius:4px;}
                .rounded {border-radius: 6px;}
                </style>
              </head>
              <body>
                <div class="banner rounded">
                  <img src="https://res.cloudinary.com/kinfolk-cloudinary/image/upload/v1724306583/kinfolkwhite_jjhcfs.png" alt="kinfolk-logo" style="width: 50px!important; height: 50px;" />
                </div>
                <div class="mainContent">${ emailTemplate.newSubscriberEmailContent }</div>
                ${ ""
          // <p>
          //       Ready to dive in? Start your journey with the latest gist: 👉 <a href="${ emailTemplate.newSubscriberEmailLatestStoryUrl }"></a>${ emailTemplate.newSubscriberEmailLatestStoryUrl }</p>
          // </p>
          }
                <div class="cta-container">
                  <a href="${ emailTemplate.newSubscriberEmailCTAUrl }" target="_blank" style="text-decoration:none;color:white;">${ emailTemplate.newSubscriberEmailCTALabel }</a>
                </div>
                <p style="margin-top: 0.5rem; font-size:16px; text-align: center;">
                You are receiving this email because you subscribed to Kinfolk Chronicles.
                </p>
                <br/>
                <p style="text-align: center;">If you did not subscribe to receiving emails from Kinfolk Chronicles or you no longer wish to receive these emails, <a href="${ unsubscribeUrl }">unsubscribe</a>.</p>
                <div style="text-align: center">
                  <p style="text-decoration: underline;">20 Mall Road Suite 420, Burlington, Massachusetts, USA</p>
                </div>
              </body>
            </html>
          `;

        if (emailTemplate || emailTemplate.newSubscriberEmailContent.length > 10) {
          // @ts-ignore
          await strapi.plugins[ "email" ].services.email.send({
            to: subscriber.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: subject,
            // text: text,
            html: html,
            headers: {
              "X-Priority": "5",
              "X-MSMail-Priority": "Low",
              Importance: "Medium",
              Priority: "bulk",
              Precedence: "bulk",
              "X-Mailer": "SendGrid-Mail",
              "X-Campaign": "Primary",
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

          // const resend = new Resend(process.env.RESEND_API_KEY);

          // const { data, error } = await resend.emails.send({
          //   from: process.env.RESEND_FROM_EMAIL,
          //   to: [ subscriber.email ],
          //   subject: subject,
          //   html: html,
          //   headers: {
          //     "X-Priority": "5",
          //     "X-MSMail-Priority": "Low",
          //     Importance: "Low",
          //     Priority: "bulk",
          //     Precedence: "bulk",
          //     "X-Mailer": "SendGrid-Mail",
          //     "X-Campaign": "Primary",
          //   },
          //   // attachments: [
          //   //   {
          //   //     content: imageBase64,
          //   //     filename: path.basename(result.emailBanner.name),
          //   //     type: "image/webp", // or 'image/png' based on your image type
          //   //     disposition: "inline",
          //   //     content_id: imageCid,
          //   //   },
          //   // ],
          // });

          // if (error) {
          //   console.error({ error });
          //   return;
          // }
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

  async afterDelete(event) {
    const { result, params } = event;

    // Result contains the deleted subscriber
    if (result && result.email.length > 0) {
      try {
        // @ts-ignore
        const subscriber = result;
        // Send an email to unsubscribed user
        // Define email body format
        const subject = `Kinfolk: Unsubscribe`;
        const html = `
            <html>
              <head>
                <style>
                body {font-weight: 400; width: 100%;}
                h1, h2, h3, h4, h5, h6 {color: black;}
                p {color: black;}
                ol, ul {padding-left: 1rem;}
                .mainContent {font-size: 16px; font-weight: 400}
                img {width:100%; height: auto; max-width: 99%; border-radius: 10px;}
                .emoji img {width: 21px!important; height: 21px!important;}
                .banner {background-color: black!important; width: 100%; height: 100px; display: flex; margin-bottom: 40px; overflow:hidden;}
                .banner img {margin: auto auto; width: auto!important;}
                .cta-container {margin-top: 50px; display: flex;}
                .cta-container a {background-color: black; color: white; padding: 13px 28px; border: none; margin: 0 auto; margin-bottom: 20px;}
                .rounded {border-radius: 6px;}
                </style>
              </head>
              <body>
                <div class="banner rounded">
                  <img src="https://res.cloudinary.com/kinfolk-cloudinary/image/upload/v1724306583/kinfolkwhite_jjhcfs.png" alt="kinfolk-logo" style="width: 50px!important; height: 50px;" />
                </div>
                <div class="mainContent">You have unsubscribed from recieving emails from Kinfolk</div>
                <p style="margin-top: 0.5rem; font-size:16px; text-align: center;">We're sorry to see you go. But this is not the end. See you around!</p>
                <br />
                <div style="text-align: center">
                  <p style="text-decoration: underline;">20 Mall Road Suite 420, Burlington, Massachusetts, USA</p>
                </div>
              </body>
            </html>
          `;
        // @ts-ignore
        await strapi.plugins[ "email" ].services.email.send({
          to: subscriber.email,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: subject,
          // text: text,
          html: html,
          headers: {
            "X-Priority": "5",
            "X-MSMail-Priority": "Low",
            Importance: "Medium",
            Priority: "bulk",
            Precedence: "bulk",
            "X-Mailer": "SendGrid-Mail",
            "X-Campaign": "Primary",
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

        // const resend = new Resend(process.env.RESEND_API_KEY);

        // const { data, error } = await resend.emails.send({
        //   from: process.env.RESEND_FROM_EMAIL,
        //   to: [ subscriber.email ],
        //   subject: subject,
        //   html: html,
        //   headers: {
        //     "X-Priority": "5",
        //     "X-MSMail-Priority": "Low",
        //     Importance: "Low",
        //     Priority: "bulk",
        //     Precedence: "bulk",
        //     "X-Mailer": "SendGrid-Mail",
        //     "X-Campaign": "Promotions",
        //   },
        //   // attachments: [
        //   //   {
        //   //     content: imageBase64,
        //   //     filename: path.basename(result.emailBanner.name),
        //   //     type: "image/webp", // or 'image/png' based on your image type
        //   //     disposition: "inline",
        //   //     content_id: imageCid,
        //   //   },
        //   // ],
        // });

        // if (error) {
        //   console.error({ error });
        //   return;
        // }

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

    return;
  }
}
