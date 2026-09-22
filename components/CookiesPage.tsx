import React, { useEffect, useState } from 'react';
import { ArrowLeft, BarChart3, Cookie, Mail, Settings2, ShieldCheck } from 'lucide-react';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';

interface CookiesPageProps {
  onBack: () => void;
}

const tocItems: DocumentTocItem[] = [
  { id: 'chto-takoe-cookie', label: 'Что такое cookie?' },
  { id: 'kakie-tehnologii', label: 'Какие технологии используются' },
  { id: 'analitika', label: 'Веб-аналитика' },
  { id: 'konfidencialnost', label: 'Конфиденциальность' },
  { id: 'upravlenie-cookie', label: 'Как управлять cookie' },
  { id: 'kontakty', label: 'Контакты' },
  { id: 'izmeneniya', label: 'Изменения политики' },
];

export const CookiesPage: React.FC<CookiesPageProps> = ({ onBack }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const activeId = useActiveDocumentSection(tocItems);
  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  useEffect(() => {
    document.title = 'Политика использования cookie | Safe Visa';
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <DocumentToc
          variant="mobile"
          items={tocItems}
          activeId={activeId}
          isOpen={tocOpen}
          onToggle={() => setTocOpen((open) => !open)}
          onNavigate={navigateTo}
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] xl:gap-14">
          <article className="min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-dark-card md:rounded-[2.5rem]">
            <header className="bg-dark px-5 py-8 text-white sm:px-8 md:px-12 md:py-12">
              <button
                type="button"
                onClick={onBack}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Вернуться на главную
              </button>
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-2xl bg-white/10 p-3">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Юридическая информация</p>
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                    Политика использования файлов cookie
                  </h1>
                  <p className="mt-4 text-sm text-slate-300">Последнее обновление: 22.09.2026</p>
                </div>
              </div>
            </header>

            <div className="space-y-8 px-5 py-8 text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:px-8 md:px-12 md:py-12">
              <section id="chto-takoe-cookie" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Что такое cookie?</h2>
                <p>
                  Cookie — это небольшие текстовые файлы, которые сайт может сохранить на вашем устройстве. Они помогают
                  запомнить настройки и сделать повторное посещение сайта удобнее.
                </p>
                <p>
                  Cookie не дают сайту доступа к личным файлам на устройстве. Safe Visa не использует cookie для хранения
                  паспортных данных, анкет или других документов клиентов.
                </p>
              </section>

              <section id="kakie-tehnologii" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <div className="flex items-center gap-3">
                  <Settings2 className="h-6 w-6 shrink-0 text-accent" />
                  <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Какие технологии используются?</h2>
                </div>
                <h3 className="text-xl font-bold text-dark dark:text-white">Технические cookie и локальное хранилище</h3>
                <p>
                  Они нужны для работы сайта и сохранения технических настроек, например выбранной темы оформления и
                  вашего решения по использованию cookie. Без них отдельные настройки могут сбрасываться при следующем
                  посещении.
                </p>
                <div className="rounded-2xl border border-primary/20 bg-light-200 p-5 text-sm text-slate-700 dark:border-primary/30 dark:bg-slate-800 dark:text-slate-200">
                  В текущей версии сайта мы не сохраняем через cookie сведения, позволяющие самостоятельно установить
                  личность посетителя. При выборе «Отклонить» сохраняется только техническая запись о вашем выборе.
                </div>
              </section>

              <section id="analitika" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 shrink-0 text-accent" />
                  <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Веб-аналитика</h2>
                </div>
                <p>
                  После выбора «Принять» сайт подключает Яндекс.Метрику. Она помогает анализировать посещения, переходы
                  по ссылкам, глубину прокрутки и время взаимодействия с материалами сайта, включая статьи.
                </p>
                <p>
                  В Метрику не передаются анкеты, паспорта, документы, имя, телефон, электронная почта или другие данные
                  заявки. Если вы выберете «Отклонить», Яндекс.Метрика не загружается.
                </p>
              </section>

              <section id="konfidencialnost" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-accent" />
                  <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Как мы защищаем конфиденциальность?</h2>
                </div>
                <ul className="list-disc space-y-2 pl-6">
                  <li>не продаём и не публикуем сведения о посетителях сайта;</li>
                  <li>не используем cookie для хранения паспортов, анкет и копий документов;</li>
                  <li>обрабатываем данные заявки по отдельному согласию и в соответствии с политикой обработки ПДн;</li>
                  <li>запускаем Яндекс.Метрику только после выбора «Принять» в уведомлении о cookie;</li>
                  <li>ограничиваем использование технических данных целями работы и улучшения сайта.</li>
                </ul>
                <p>
                  Подробные правила обработки персональных данных опубликованы на странице{' '}
                  <a className="text-accent underline underline-offset-4 hover:text-accent-hover" href="#/policy">согласия на обработку ПДн</a>.
                </p>
              </section>

              <section id="upravlenie-cookie" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Как управлять cookie?</h2>
                <p>
                  Вы можете удалить сохранённые cookie и данные сайта в настройках браузера, а также запретить их
                  сохранение. При этом баннер согласия может появиться снова, а отдельные настройки сайта могут сброситься.
                </p>
                <p>
                  Управление обычно находится в разделе настроек конфиденциальности браузера: Chrome, Safari, Firefox,
                  Edge и других браузеров. Названия пунктов могут отличаться в зависимости от версии браузера.
                </p>
              </section>

              <section id="kontakty" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Контакты</h2>
                <p>Если у вас есть вопросы об использовании cookie на сайте, напишите нам:</p>
                <address className="not-italic">
                  <strong className="text-dark dark:text-white">Индивидуальный предприниматель Соболева Ирина Андреевна</strong><br />
                  Email: <a className="text-accent underline underline-offset-4 hover:text-accent-hover" href="mailto:Irina.sapozhkova@gmail.com">Irina.sapozhkova@gmail.com</a><br />
                  Телефон: <a className="text-accent underline underline-offset-4 hover:text-accent-hover" href="tel:+79015009901">+7 901 500-99-01</a>
                </address>
              </section>

              <section id="izmeneniya" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Изменения в политике</h2>
                <p>
                  Мы можем обновлять эту политику при изменении сайта, подключении новых сервисов или требований к
                  обработке данных. Актуальная версия всегда публикуется на этой странице и действует с момента публикации.
                </p>
              </section>
            </div>
          </article>

          <DocumentToc variant="desktop" items={tocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </section>
  );
};
