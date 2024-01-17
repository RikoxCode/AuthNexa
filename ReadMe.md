# AuthNexa API
![AuthNexa logo](https://github.com/RikoxCode/AuthNexa/assets/111433435/c2b4752e-3b70-4b97-9c23-11ae9d763d7c)

The AuthNexa API enables authentication and authorization using JSON Web Tokens (JWT). The entire API is implemented as a NestAPI and consists of the following components:

## AuthService
The AuthService is responsible for authenticating users. It generates and validates JWTs to ensure that only authorized users can access specific resources.

## UserService
The UserService manages user information and provides functionalities such as user registration, profile management, and updates.

## MailService
The MailService handles email communication related to user authentication. This may include the delivery of confirmation emails, password reset links, and similar actions.

**Note:** All requests to this API must start with "/api/" and are accessible only over the internet. The API is available as a localhost API.

## Sample Application
Um die AuthNexa API in einer Anwendung zu verwenden, können Sie HTTP-Anfragen an die entsprechenden Endpunkte senden, um Benutzer zu authentifizieren, Benutzerinformationen zu verwalten und E-Mail-bezogene Aktionen auszulösen.

**Sample Requests:**
```bash
# Sample: User authentification
curl -X POST http://localhost:4000/api/auth/login -d '{"username": "OldUser", "password": "Password01243"}'

# Sample: User registration
curl -X POST http://localhost:4000/api/auth/register -d '{"username": "NewUser", "password": "Password123", "email": "newuser@example.com"}'

# Sample: Users list requesting
curl -X GET http://localhost:4000/api/users

# Sample: E-Mail for Password reseting send
curl -X POST http://localhost:4000/api/mail/pw-forgot-send/:token -d '{"username": "OldUser", "password": "Password01243", email:"olduser@example.com"}'
```

## Stay in touch
Contact me under [my mail](mailto:support@netshlife.dev)

## License

Nest is [MIT licensed](LICENSE).
