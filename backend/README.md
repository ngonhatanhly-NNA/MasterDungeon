# Backend (future)

The initial game is single-player and runs entirely in the browser. No backend is needed for the MVP.

When cloud features are justified, this folder can become a typed API service (suggested: FastAPI) with explicit modules:

```text
backend/
├── app/
│   ├── api/             # versioned route handlers
│   ├── auth/            # identity and sessions
│   ├── game_state/      # server-side validation of cloud saves
│   ├── accounts/        # profile settings
│   ├── database/        # models, migrations and repository layer
│   └── security/        # validation, rate limits, audit events
├── tests/
└── README.md
```

## Future API boundaries

- `POST /v1/saves` — validate and store a versioned save snapshot.
- `GET /v1/saves/{slot}` — retrieve the authenticated user's save.
- `GET /v1/profile` — profile metadata only; never trust client-provided identity.
- Future multiplayer endpoints must validate movement, inventory changes and quest completion server-side.

## Rules

- Do not build accounts before local save data is versioned and tested.
- Do not trust the browser to award exclusive items or claim quest completion in multiplayer.
- Validate request schemas, apply authentication/authorization, rate-limit endpoints and avoid logging secrets.
- Keep any future AI provider key on the server; never ship secrets in Vite client variables.
