import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * This is the default rout for the API and responds with a redirect to the API docs
   * @returns string: HTML
   */
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
        window.location.href = "/api/docs";
        </script>
    </body>
    </html>`;
  }
}
