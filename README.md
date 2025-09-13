# K+ CRM (starter)
Стартовая CRM для автосервиса **K+**: Next.js 14 + Prisma + Auth.js (Google) + Tailwind + Лиды-как-чаты.

## Установка
npm i
cp .env.example .env
# заполни GOOGLE_CLIENT_ID/SECRET (Google Cloud OAuth) и SUPERADMIN_EMAIL
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev

## Google OAuth
В Google Cloud Console:
- OAuth consent screen → External (или Internal) → заполнить
- Credentials → Create Credentials → OAuth Client ID → Web
  - Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
- Скопируй CLIENT_ID и CLIENT_SECRET в .env

## Роли
Email из SUPERADMIN_EMAIL получает роль ADMIN при первом входе. Раздел /admin даёт смену ролей другим пользователям.

## Интеграции чатов
Схема ChatThread хранит provider/externalId для привязки Телеграм/WhatsApp/VK/Авито. Подключай вебхуки провайдеров в /app/api/* и связывай сообщения с ChatThread по externalId.
