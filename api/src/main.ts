import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path'; // Import path module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('AuthNexa API')
    .setDescription(
      'AuthNexa is a simple authentication API that allows you to register, login, and reset your password. It contains a user management system and a mail service. On top of that, it is built with NestJS, MongoDB, and Swagger.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://authnexa.netshlife.dev/', 'Production')
    .addTag('AuthNexa API')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Adjust the path to point to your favicon
  const faviconPath = path.join(__dirname, 'assets', 'JmrService-removebg-preview.ico');

  SwaggerModule.setup('api/docs', app, document, {
    customfavIcon: faviconPath, // Updated favicon path
    customSiteTitle: 'AuthNexa API', // Add site title to Swagger for nice SEO
    swaggerOptions: {
      persistAuthorization: true, // Retain the token even after refreshing the Swagger UI web page
    },
  });

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
