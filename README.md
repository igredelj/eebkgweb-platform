# EEBKG Web Platform

Monorepo scaffold for a multi-tenant flight booking app.

## Apps

- `apps/web`: React, React Router, Redux Toolkit, tenant-driven theme/flow.
- `apps/bff`: Laravel BFF with mock API responses.
- `packages/config-schema`: shared tenant config schema/types.
- `mock-data`: tenant configs and fake booking API responses.

## Local Development

Install dependencies:

```sh
npm install
cd apps/bff && composer install
```

Start the Laravel BFF:

```sh
cd apps/bff
php artisan serve --host=127.0.0.1 --port=8000
```

Start the React app:

```sh
npm run dev
```

Open:

```txt
http://localhost:5173
```

Use another tenant locally with:

```txt
http://localhost:5173?tenant=skyline
```

## Docker Development

Start both apps with Docker Compose:

```sh
docker compose up --build
```

Open:

```txt
http://localhost:5173
```

The React container proxies `/api` requests to the Laravel service at `http://bff:8000`. The Laravel container serves mock booking responses from `mock-data`.

Run checks in containers:

```sh
docker compose run --rm web sh -lc "npm install && npm run lint -w apps/web"
docker compose run --rm web sh -lc "npm install && npm run test -w apps/web"
docker compose run --rm web sh -lc "npm install && npm run build -w apps/web"
docker compose run --rm bff sh -lc "composer install && php artisan test"
```

## Verification

```sh
npm run lint
npm run test
npm run build
cd apps/bff && php artisan test
```
