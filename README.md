# Hono Todo Application

## Commands
```
npm install
npm run dev
```

```
npm run deploy
```

## Überblick
Diese Anwendung ist eine einfache REST-API, die mit `Hono`, einem modernen Web-Framework für Deno, gebaut wurde. Sie ermöglicht Benutzern das Erstellen, Abrufen und Verwalten von Todo-Einträgen. Die Anwendung unterstützt CORS und bietet eine Swagger-UI für eine einfachere API-Dokumentation und Interaktion.

## Funktionen
- **Basis-Endpoints**: `GET /`, `GET /todos`, `GET /todos/:user_id`, `POST /todos/:user_id`.
- **Fehlerbehandlung**: Benutzerdefinierte Fehlermeldungen und HTTP-Statuscodes.
- **Swagger-UI**: Interaktive API-Dokumentation unter `/ui`.
- **CORS-Unterstützung**: Ermöglicht Cross-Origin-Anfragen.

## Anforderungen
- Deno
- Zugriff auf ein KVNamespace für die Speicherung von Todos.

## Schnellstart
1. **Installation von Deno**: Besuchen Sie [Deno's offizielle Website](https://deno.land/) und folgen Sie den Anweisungen zur Installation.
2. **Klonen des Repos**: `git clone [Ihr Repository-URL]`.
3. **Starten der Anwendung**: Führen Sie `deno run --allow-net index.ts` in Ihrem Terminal aus.

## API-Endpunkte
### Basis-URL: `http://localhost:8000`
- `GET /`: Begrüßt Benutzer.
- `GET /todos`: Listet alle Todos auf.
- `GET /todos/:user_id`: Listet Todos eines bestimmten Benutzers auf.
- `POST /todos/:user_id`: Erstellt ein Todo für einen bestimmten Benutzer.

## Fehlerbehandlung
Die Anwendung gibt benutzerdefinierte Fehlermeldungen und HTTP-Statuscodes basierend auf dem Fehlerkontext zurück. Dies umfasst die Handhabung von `CustomError` und `StructError`.
