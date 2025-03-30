import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { MailDto } from './dto';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Change to your email provider (e.g., Mailtrap, SendGrid, SMTP)
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendEmail(mail: MailDto): Promise<void> {
    try {
      const recipient = this.configService.get<string>('RECEPIENT');

      const emailHtml = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background: #f9f9f9;">
        <h2 style="text-align: center; color: #333;">📩 New Contact Form Message</h2>
        
        <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${mail.name}</p>
          <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${mail.email}</p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 16px; color: #333;"><strong>Message:</strong></p>
          <p style="font-size: 16px; color: #666; background: #f4f4f4; padding: 10px; border-radius: 5px;">${mail.message}</p>
        </div>

        <p style="text-align: center; font-size: 14px; color: #888; margin-top: 15px;">
          This message was sent from your website contact form.
        </p>
      </div>
    `;

      await this.transporter.sendMail({
        from: `"${mail.name}" <${mail.email}>`,
        to: recipient,
        subject: '📩 New Contact Form Message',
        text: `Name: ${mail.name}\nEmail: ${mail.email}\nMessage: ${mail.message}`,
        html: emailHtml,
      });

      console.log(`📧 Email sent successfully to ${recipient}`);
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
