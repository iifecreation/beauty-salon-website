import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SMTP settings for production
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export async function sendConfirmationEmail({
  to,
  name,
  inquiryType,
  serviceType,
  message,
}: {
  to: string;
  name: string;
  inquiryType: 'service' | 'training';
  serviceType?: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #fff0f5; text-align: center; padding: 30px 20px;">
        <img src="cid:logo" alt="Beauty Kept Logo" width="80" style="margin-bottom: 10px;" />
        <h2 style="color: #D81B60; margin: 0;">Thank You for Reaching Out!</h2>
      </div>

      <div style="padding: 25px 20px; background-color: #ffffff;">
        <p>Hi <strong>${name}</strong>,</p>

        <p>Thank you for contacting <strong>Beauty Kept</strong>. We've received your ${inquiryType === 'service' ? 'service request' : 'training inquiry'}, and our team will get back to you shortly.</p>

        ${
          serviceType
            ? `<p><strong>${inquiryType === 'service' ? 'Service' : 'Course'} Interested In:</strong> ${serviceType}</p>`
            : ''
        }

        <p style="margin-top: 20px;"><strong>Your Message:</strong></p>
        <blockquote style="border-left: 3px solid #D81B60; padding-left: 15px; color: #555;">
          ${message}
        </blockquote>

        <p style="margin-top: 30px;">
          If you have any urgent questions, feel free to reply to this email. We look forward to helping you look and feel your best!
        </p>

        <p style="margin-top: 30px;">Warm regards,<br /><strong>The Beauty Kept Team</strong></p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #999; padding: 20px; background-color: #fafafa;">
        © ${new Date().getFullYear()} Beauty Kept. All rights reserved.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Beauty Kept" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'We Received Your Inquiry – Beauty Kept',
    html,
    attachments: [
      {
        filename: 'logo1.svg',
        path: `${process.cwd()}/public/logo1.svg`,
        cid: 'logo', // referenced in the email HTML
      },
    ],
  });
}

