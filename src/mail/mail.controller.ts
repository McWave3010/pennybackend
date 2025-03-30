import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './mail.service';
import { MailDto } from './dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() mail: MailDto) {
    console.log(mail);
    // Removed extra closing parenthesis
    await this.emailService.sendEmail(mail);
    return { message: 'Email sent successfully!' };
  }
}
