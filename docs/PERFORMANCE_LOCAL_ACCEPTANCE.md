# Локальная приёмка оптимизации производительности

Дата проверки: 28 сентября 2026 года.

Статус: локальная версия готова к отдельному решению о коммите. Push, deploy и изменения production не выполнялись.

## Что проверено

| Проверка | Результат | Фактическое подтверждение |
|---|---|---|
| Production-сборка | PASS | `npm run build`, Vite собрал проект без ошибок |
| Чистота diff | PASS | `git diff --check` без замечаний |
| Главная, 390 × 844 | PASS | нет горизонтального переполнения; заголовок блога в одну строку; `2 000+` не переносится |
| Главная, 768 × 1024 | PASS | нет горизонтального переполнения; планшетная сетка работает |
| Главная, 1440 × 900 | PASS | три тарифа в ряд, популярный тариф в центре |
| Главная CTA | PASS | прокручивает к услугам и не добавляет `#` в URL |
| Тарифы на мобильном | PASS | свайп, стрелки и точки переключают все три тарифа |
| Отзывы | PASS | изображение открывается и закрывается, после закрытия автодвижение продолжается |
| Мобильное меню | PASS | открывается, переход на `/blog` выполняется, меню закрывается |
| Блог | PASS | на мобильном H1 занимает две строки; на десктопе четыре карточки стоят в одном ряду |
| Юридические маршруты | PASS | `/privacy`, `/policy`, `/cookies`, `/offer` открываются напрямую, переполнения нет |
| Статья и mini1 | PASS | `/article/visa-after-refusal` и `/mini1` открываются напрямую, переполнения нет |
| Cookie: отказ | PASS | после отказа скрипт Яндекс.Метрики отсутствует |
| Cookie: согласие | PASS | после согласия добавляется `https://mc.yandex.ru/metrika/tag.js` |
| Tailwind и шрифты | PASS | в рабочем DOM нет `cdn.tailwindcss.com`, Google Fonts и Gstatic; используются локальная CSS-сборка и WOFF2 |
| `robots.txt` | PASS | локальный сервер возвращает текст `User-agent: *` и `Allow: /` вместо HTML |
| Safe Case, 390/768/1440 | PASS | нет горизонтального переполнения; мобильное и десктопное содержание переключаются корректно |
| Prodamus при входе | PASS | при открытии `/usa-safecase` скрипта и iframe нет |
| Prodamus после CTA | PASS | создаётся один iframe, минимальная высота 560 px, задан понятный `title` |
| Ошибки браузера | PASS | ошибок и предупреждений в консоли не найдено |

## Экономия изображений

Проверено 46 исходных изображений, которые теперь подключаются адаптивно. Исходники не перезаписаны.

- общий вес исходников: **24,49 МБ**;
- комплект WebP шириной 480 px: **0,96 МБ**, экономия около **96%**;
- комплект WebP шириной 800 px: **2,02 МБ**, экономия около **91%**;
- комплект WebP шириной 1200 px или максимальной доступной ширины: **3,17 МБ**, экономия около **87%**.

Проценты в таблице рассчитаны относительно WebP 800 px. Для маленького аватара используется максимальный вариант 480 px.

| Старый файл | Новые файлы | Было | WebP 800 | Экономия |
|---|---|---:|---:|---:|
| `approved-visas.png` | `approved-visas-{480,800,1200}.webp` + PNG-резерв | 2270 КБ | 64 КБ | 97% |
| `article-preview.jpeg` | `article-preview-{480,800,1200}.webp` + JPEG-резерв | 376 КБ | 59 КБ | 84% |
| `chances-assessment.jpeg` | `chances-assessment-{480,800,1200}.webp` + JPEG-резерв | 362 КБ | 53 КБ | 85% |
| `client-review-flag-01.jpeg` | `client-review-flag-01-{480,800,1200}.webp` + JPEG-резерв | 1181 КБ | 40 КБ | 96% |
| `client-reviews-collage.jpeg` | `client-reviews-collage-{480,800,1200}.webp` + JPEG-резерв | 692 КБ | 86 КБ | 87% |
| `client-reviews-overview.jpeg` | `client-reviews-overview-{480,800,1200}.webp` + JPEG-резерв | 524 КБ | 57 КБ | 88% |
| `client-visas-01.jpeg` | `client-visas-01-{480,800,1200}.webp` + JPEG-резерв | 540 КБ | 51 КБ | 90% |
| `client-visas-02.jpeg` | `client-visas-02-{480,800,1200}.webp` + JPEG-резерв | 851 КБ | 93 КБ | 89% |
| `cost-of-refusal.jpeg` | `cost-of-refusal-{480,800,1200}.webp` + JPEG-резерв | 133 КБ | 59 КБ | 55% |
| `eight-steps.jpeg` | `eight-steps-{480,800,1200}.webp` + JPEG-резерв | 392 КБ | 56 КБ | 85% |
| `glasses.png` | `glasses-{480,800,1200}.webp` + PNG-резерв | 2156 КБ | 26 КБ | 98% |
| `guarantees.jpeg` | `guarantees-{480,800,1200}.webp` + JPEG-резерв | 305 КБ | 41 КБ | 86% |
| `interview-risks.jpeg` | `interview-risks-{480,800,1200}.webp` + JPEG-резерв | 392 КБ | 50 КБ | 87% |
| `irina-avatar-flag.png` | `irina-avatar-flag-{480,800,1200}.webp` + JPEG-резерв | 2036 КБ | 43 КБ | 97% |
| `irina-with-visa.jpeg` | `irina-with-visa-{480,800,1200}.webp` + JPEG-резерв | 308 КБ | 56 КБ | 81% |
| `matryoshka.png` | `matryoshka-{480,800,1200}.webp` + PNG-резерв | 2405 КБ | 57 КБ | 97% |
| `method-on-whiteboard.png` | `method-on-whiteboard-{480,800,1200}.webp` + JPEG-резерв | 2297 КБ | 82 КБ | 96% |
| `success-cases.jpeg` | `success-cases-{480,800,1200}.webp` + JPEG-резерв | 361 КБ | 49 КБ | 86% |
| `visa-myths.jpeg` | `visa-myths-{480,800,1200}.webp` + JPEG-резерв | 415 КБ | 61 КБ | 85% |
| `visa-refusal.jpeg` | `visa-refusal-{480,800,1200}.webp` + JPEG-резерв | 364 КБ | 51 КБ | 85% |
| `client-review-01.jpg` | `client-review-01-{480,800}.webp` + JPEG-резерв | 75 КБ | 21 КБ | 71% |
| `client-review-02.jpg` | `client-review-02-{480,800}.webp` + JPEG-резерв | 169 КБ | 58 КБ | 65% |
| `client-review-03.jpg` | `client-review-03-{480,800}.webp` + JPEG-резерв | 153 КБ | 45 КБ | 70% |
| `client-review-04.jpg` | `client-review-04-{480,800}.webp` + JPEG-резерв | 104 КБ | 39 КБ | 62% |
| `client-review-05.jpg` | `client-review-05-{480,800}.webp` + JPEG-резерв | 96 КБ | 32 КБ | 66% |
| `client-review-06.jpg` | `client-review-06-{480,800}.webp` + JPEG-резерв | 102 КБ | 34 КБ | 65% |
| `client-review-07.jpg` | `client-review-07-{480,800}.webp` + JPEG-резерв | 106 КБ | 37 КБ | 64% |
| `client-review-08.jpg` | `client-review-08-{480,800}.webp` + JPEG-резерв | 70 КБ | 20 КБ | 70% |
| `client-review-09.jpg` | `client-review-09-{480,800}.webp` + JPEG-резерв | 84 КБ | 25 КБ | 70% |
| `client-review-10.jpg` | `client-review-10-{480,800}.webp` + JPEG-резерв | 70 КБ | 19 КБ | 71% |
| `client-review-11.jpg` | `client-review-11-{480,800}.webp` + JPEG-резерв | 80 КБ | 24 КБ | 69% |
| `contact-telegram-mockup.png` | `contact-telegram-mockup-{480,800,1200}.webp` + PNG-резерв | 1689 КБ | 62 КБ | 96% |
| `irina-blog-avatar.png` | `irina-blog-avatar-{160,320,480}.webp` + JPEG-резерв | 2036 КБ | 20 КБ* | 98% |
| `irina-visa-expert-hero.jpg` | `irina-visa-expert-hero-{480,800,1200}.webp` + JPEG-резерв | 261 КБ | 42 КБ | 83% |
| `safe-case-method.webp` | `safe-case-method-{480,800,1200}.webp` + JPEG-резерв | 97 КБ | 27 КБ | 71% |
| `social-media-mockup.webp` | `social-media-mockup-{480,800,1200}.webp` + JPEG-резерв | 160 КБ | 48 КБ | 69% |
| `visa-approval-01.webp` | `visa-approval-01-{480,800,1200}.webp` + JPEG-резерв | 155 КБ | 38 КБ | 75% |
| `visa-approval-02.webp` | `visa-approval-02-{480,800,1200}.webp` + JPEG-резерв | 101 КБ | 34 КБ | 65% |
| `visa-approval-03.webp` | `visa-approval-03-{480,800,1200}.webp` + JPEG-резерв | 169 КБ | 39 КБ | 76% |
| `visa-approval-04.webp` | `visa-approval-04-{480,800,1200}.webp` + JPEG-резерв | 116 КБ | 28 КБ | 75% |
| `cancelled-visa.jpg` | `cancelled-visa-{480,800}.webp` + JPEG-резерв | 129 КБ | 30 КБ | 76% |
| `complex-family.jpg` | `complex-family-{480,800}.webp` + JPEG-резерв | 177 КБ | 58 КБ | 67% |
| `no-visa-history.jpg` | `no-visa-history-{480,800}.webp` + JPEG-резерв | 102 КБ | 23 КБ | 77% |
| `nonstandard-employment.jpg` | `nonstandard-employment-{480,800}.webp` + JPEG-резерв | 123 КБ | 30 КБ | 75% |
| `previous-refusals.jpg` | `previous-refusals-{480,800}.webp` + JPEG-резерв | 159 КБ | 49 КБ | 69% |
| `relatives-in-usa.jpg` | `relatives-in-usa-{480,800}.webp` + JPEG-резерв | 111 КБ | 26 КБ | 76% |

\* Для аватара максимальный вариант — 480 px.

## Старые HTML-файлы

В плане было переименование трёх файлов без удаления:

- `article-safe-case/index.html` → `article-safe-case/index.legacy-unused.html`;
- `article-safe-case/index (2).html` → `article-safe-case/index-old-telegram-link.legacy-unused.html`;
- `landing-visa/index.html` → `landing-visa/index.legacy-unused.html`.

На момент финальной проверки ни исходных файлов, ни переименованных копий нет в папке `Visa`, в индексе Spotlight, в локальной Корзине и в остальных каталогах `Yandex.Disk.localized`. Поэтому переименовать их сейчас невозможно. Активный сайт не пострадал: канонический React-проект находится в `soboleva_vizitka`, а канонический HTML Safe Case сохранён в `content/safe-case/source.html`.

Создавать пустые заменители или восстанавливать неизвестную старую версию не нужно. Если эти копии понадобятся, их следует восстанавливать через историю версий Яндекс Диска, а не собирать заново из текущего сайта.

## Что остаётся только после разрешения на выпуск

1. Создать отдельный коммит с явно выбранными файлами.
2. Выполнить push.
3. Дождаться успешного production-деплоя и проверить активный release.
4. Проверить заголовки кеширования, gzip и `robots.txt` на production.
5. Выполнить три мобильных PageSpeed-замера главной и Safe Case и сравнить медианный результат.
