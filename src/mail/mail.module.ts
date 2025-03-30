import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';
import { EmailController } from './mail.controller';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService],
})
export class MailModule {}
