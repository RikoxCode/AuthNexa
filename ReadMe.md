# AuthNexa API
![AuthNexa logo](https://github.com/RikoxCode/AuthNexa/assets/111433435/c2b4752e-3b70-4b97-9c23-11ae9d763d7c)

Die AuthNexa API ermöglicht Authentifizierung und Autorisierung mittels JSON Web Tokens (JWT). Die gesamte API ist als NestAPI implementiert und besteht aus den folgenden Komponenten:

## AuthService
Der AuthService ist für die Authentifizierung von Benutzern zuständig. Er generiert und validiert JWTs, um sicherzustellen, dass nur autorisierte Benutzer auf bestimmte Ressourcen zugreifen können.

## UserService
Der UserService verwaltet Benutzerinformationen und bietet Funktionen wie Benutzerregistrierung, Profilverwaltung und -aktualisierung.

## MailService
Der MailService kümmert sich um die Kommunikation per E-Mail im Zusammenhang mit der Benutzerauthentifizierung. Dies kann die Zustellung von Bestätigungsmails, Passwortrücksetzungslinks und Ähnlichem umfassen.

**Hinweis:** Alle Anfragen an diese API müssen mit "/api/" beginnen und sind ausschließlich über das Internet zugänglich. Die API ist als localhost-API verfügbar.

## Beispielanwendung
Um die AuthNexa API in einer Anwendung zu verwenden, können Sie HTTP-Anfragen an die entsprechenden Endpunkte senden, um Benutzer zu authentifizieren, Benutzerinformationen zu verwalten und E-Mail-bezogene Aktionen auszulösen.

**Beispielcode:**
```bash
# Beispiel: Benutzer authentifizieren
curl -X POST http://localhost:3000/api/auth -d '{"username": "Benutzername", "password": "Passwort"}'

# Beispiel: Benutzer registrieren
curl -X POST http://localhost:3000/api/users -d '{"username": "NeuerBenutzer", "password": "Passwort123", "email": "neuerbenutzer@example.com"}'

# Beispiel: Benutzerprofil aktualisieren
curl -X PUT http://localhost:3000/api/users/123 -d '{"profile": {"name": "Neuer Name", "email": "neue-email@example.com"}}'

# Beispiel: E-Mail für Passwortrücksetzung senden
curl -X POST http://localhost:3000/api/reset-password -d '{"email": "benutzer@example.com"}'
```

## Stay in touch
Contact me under [my mail](mailto:support@netshlife.dev)

## License

Nest is [MIT licensed](LICENSE).
