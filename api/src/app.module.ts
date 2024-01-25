import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MailModule } from './feats/mail/mail.module';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './feats/users/users.module';
// import { AuthModule } from './feats/auth/auth.module';
import { AvailableCheckModule } from './feats/available-check/available-check.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    //   isGlobal: true,
    // }),
    // MongooseModule.forRoot(process.env.MONGO_URI, {
    //   autoIndex: true,
    // }),
    // MailModule,
    // UsersModule,
    // AuthModule,
    AvailableCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
