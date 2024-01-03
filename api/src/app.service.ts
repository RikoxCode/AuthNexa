import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndexFile() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <script>
        window.location.href = "http://localhost:3000/api/docs";
        </script>
    </body>
    </html>`;
  }
}
