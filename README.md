<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

Public contact phone: `+7 901 500-99-01` (`tel:+79015009901`).

View your app in AI Studio: https://ai.studio/apps/1b70b84b-b278-443c-b583-1d75547975dd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm ci`
2. Run the app:
   `npm run dev`

The current static site does not use an API key. Do not add `GEMINI_API_KEY`
or another secret to this frontend unless a separately reviewed server-side
feature needs it.

## Оглавление документов и статей

Все длинные документы и статьи используют общий компонент `components/DocumentToc.tsx`. Не создавай для новой страницы отдельную боковую колонку, второй hamburger или собственную реализацию оглавления.

Принятый интерфейс:

- на десктопе основной текст находится слева, а справа постоянно видна sticky-колонка «Содержание» под фиксированной шапкой;
- на мобильном экране используется одна закреплённая кнопка «Содержание» и нижняя шторка;
- длинный список на десктопе прокручивается только внутри своей колонки, на мобильном — внутри открытой шторки;
- активный раздел определяется по текущему положению документа, подсвечивается и автоматически показывается внутри списка;
- переход к пункту учитывает фиксированную шапку, а после выбора шторка закрывается.

### Новая Markdown-статья

Используй заголовки второго уровня `##`: `ArticlePage.tsx` собирает из них оглавление автоматически. Заголовки должны быть содержательными и уникальными в пределах статьи. Инструкция по добавлению файла находится в [`content/README.md`](content/README.md), заготовка — в [`ARTICLE_TEMPLATE.md`](ARTICLE_TEMPLATE.md).

### Новая React-страница или юридический документ

1. Добавь каждому разделу стабильный уникальный `id`.
2. Собери массив `DocumentTocItem[]` с теми же `id` и подписями разделов.
3. Подключи `useActiveDocumentSection`, `scrollToDocumentSection` и обе адаптивные версии `DocumentToc` по образцу `OfferPage.tsx` или `PolicyPage.tsx`.
4. Используй одно общее состояние открытия для десктопной и мобильной версии.

После добавления страницы проверь на десктопе и мобильном экране: доступность закреплённой кнопки после длинной прокрутки, переход к каждому разделу, закрытие шторки после выбора и соответствие подсвеченного пункта текущему заголовку.
