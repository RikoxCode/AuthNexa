import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './feats/auth/auth.controller';
import { AuthModule } from './feats/auth/auth.module';
import { MailService } from './feats/mail/mail.service';
import { MailController } from './feats/mail/mail.controller';
import { MailModule } from './feats/mail/mail.module';
import { UserModule } from './feats/user/user.module';

@Module({
  imports: [AuthModule, MailModule, UserModule],
  controllers: [AppController, AuthController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
