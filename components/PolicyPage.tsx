import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';

interface PolicyPageProps {
  onBack: () => void;
}

const tocItems: DocumentTocItem[] = [
  { id: 'operator-i-forma-soglasiya', label: 'Оператор и форма согласия' },
  { id: 'celi-obrabotki', label: 'Цели обработки' },
  { id: 'kategorii-dannyh', label: 'Категории данных' },
  { id: 'deystviya-s-dannymi', label: 'Действия с данными' },
  { id: 'peredacha-tretim-licam', label: 'Передача третьим лицам и за рубеж' },
  { id: 'srok-obrabotki', label: 'Срок обработки и уничтожение' },
  { id: 'otzyv-i-prava', label: 'Отзыв согласия и права' },
  { id: 'rekvizity-operatora', label: 'Реквизиты оператора' },
];

export const PolicyPage: React.FC<PolicyPageProps> = ({ onBack }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const activeId = useActiveDocumentSection(tocItems);
  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  useEffect(() => {
    document.title = 'Согласие на обработку персональных данных | Safe Visa';
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
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Юридическая информация</p>
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                    Согласие на обработку персональных данных
                  </h1>
                </div>
              </div>
            </header>

            <div className="space-y-6 px-5 py-8 text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:px-8 md:px-12 md:py-12">
              <section id="operator-i-forma-soglasiya" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Оператор и форма согласия</h2>
                <p>
                  Настоящий текст предназначен для отдельного согласия субъекта персональных данных на обработку данных
                  индивидуальным предпринимателем Соболевой Ириной Андреевной (далее — Оператор) в связи с услугами,
                  описанными в публичной оферте Safe Visa.
                </p>
                <p>
                  Согласие даётся свободно, своей волей и в своём интересе, является конкретным, предметным,
                  информированным, сознательным и однозначным. В электронной форме оно оформляется отдельно от акцепта
                  оферты, политики конфиденциальности и рекламных согласий — например, отдельной отметкой в форме.
                </p>
                <div className="rounded-2xl border border-primary/20 bg-light-200 p-5 text-sm text-slate-700 dark:border-primary/30 dark:bg-slate-800 dark:text-slate-200">
                  При подключении формы заявки нужно сохранить отдельную активную галочку согласия и доказательство её
                  получения. Эта страница публикует текст согласия, но сама по себе не подтверждает его получение.
                </div>
              </section>

              <section id="celi-obrabotki" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Цели обработки</h2>
                <ol className="list-decimal space-y-2 pl-6">
                  <li>связаться с заявителем, провести консультацию и согласовать состав, стоимость и порядок услуг;</li>
                  <li>заключить, исполнить, изменить и прекратить договор по оферте, а также вести расчёты и разрешать претензии;</li>
                  <li>подготовить анкеты, заявления и документы для визового обращения, включая заполнение форм по данным заявителя;</li>
                  <li>организовать переводы, запись, передачу документов и коммуникацию через согласованные каналы связи;</li>
                  <li>исполнить обязанности, которые возложены на Оператора законом, и защитить права в случае спора.</li>
                </ol>
                <p>Настоящее согласие не является согласием на рекламные рассылки, публикацию данных или их распространение в открытом доступе.</p>
              </section>

              <section id="kategorii-dannyh" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Категории данных</h2>
                <p>В зависимости от выбранной услуги и конкретного заявителя могут обрабатываться только необходимые данные:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>фамилия, имя, отчество, дата и место рождения, гражданство;</li>
                  <li>данные паспорта или иного документа, удостоверяющего личность, адрес проживания или регистрации;</li>
                  <li>номер телефона, электронная почта и идентификаторы согласованных мессенджеров;</li>
                  <li>сведения о работе, доходах, образовании, семье, поездках, визах и предыдущих отказах — если они нужны для выбранной услуги;</li>
                  <li>фотографии, копии документов, анкеты и иные материалы, которые заявитель передал для подготовки обращения;</li>
                  <li>данные сопровождаемых детей и других заявителей, если их предоставляет клиент или представитель.</li>
                </ul>
                <p>
                  Объём данных определяется конкретной целью и не включает формулировку «любые иные данные». Специальные
                  категории и биометрические персональные данные не входят в это общее согласие, если для них требуется
                  отдельное правовое основание или отдельное согласие.
                </p>
                <p>
                  Если согласие даётся за ребёнка или другого заявителя, его даёт законный либо надлежащим образом
                  уполномоченный представитель. Оператор вправе запросить подтверждение полномочий.
                </p>
              </section>

              <section id="deystviya-s-dannymi" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Действия с данными</h2>
                <p>
                  Оператор может осуществлять сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение,
                  использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление и уничтожение
                  данных — автоматизированно, неавтоматизированно или смешанным способом, только в объёме, необходимом для целей выше.
                </p>
              </section>

              <section id="peredacha-tretim-licam" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Передача третьим лицам и за рубеж</h2>
                <p>
                  Для исполнения услуги данные могут быть предоставлены консульствам и дипломатическим представительствам,
                  визовым центрам, системам записи, переводчикам, курьерам, платёжным и IT-провайдерам, сервисам связи,
                  бухгалтерам и юристам. Передача ограничивается необходимыми данными и соответствующей целью.
                </p>
                <p>
                  Визовое обращение может потребовать трансграничной передачи данных в иностранные органы, визовые центры
                  или используемые для записи сервисы. Такая передача осуществляется только при наличии применимого
                  правового основания и с соблюдением требований законодательства о персональных данных.
                </p>
              </section>

              <section id="srok-obrabotki" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Срок обработки и уничтожение</h2>
                <p>
                  Согласие действует до его отзыва или до достижения целей обработки, если более раннее прекращение не
                  требуется законом. Данные хранятся в течение исполнения договора и далее в течение обязательных сроков
                  хранения документов, предъявления требований и защиты прав. После этого они уничтожаются или обезличиваются,
                  если отсутствует иное законное основание для хранения.
                </p>
              </section>

              <section id="otzyv-i-prava" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Отзыв согласия и права</h2>
                <p>
                  Субъект или его представитель может отозвать согласие и направить запрос об уточнении, доступе,
                  блокировании или уничтожении данных на <a className="text-accent underline underline-offset-4" href="mailto:Irina.sapozhkova@gmail.com">Irina.sapozhkova@gmail.com</a>
                  {' '}либо по телефону <a className="text-accent underline underline-offset-4" href="tel:+79015009901">+7 901 500-99-01</a>.
                  Запросы рассматриваются в сроки и порядке, установленные законом; Оператор может проверить личность заявителя и полномочия представителя.
                </p>
                <p>
                  Отзыв не влияет на законность обработки, выполненной до его получения. Оператор вправе продолжить
                  обработку без согласия, если это необходимо для исполнения договора, выполнения обязанности по закону,
                  защиты прав и иных предусмотренных законом оснований. Удаление данных не производится, когда их сохранение обязательно по закону или необходимо для спора.
                </p>
              </section>

              <section id="rekvizity-operatora" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">Реквизиты оператора</h2>
                <address className="not-italic">
                  <strong className="text-dark dark:text-white">Индивидуальный предприниматель Соболева Ирина Андреевна</strong><br />
                  ОГРНИП: 325774600606207<br />
                  ИНН: 343523500039<br />
                  Адрес: 117628, г. Москва, Новоясеневский проспект, д. 12, корп. 1, кв. 293<br />
                  Email: <a className="text-accent underline underline-offset-4" href="mailto:Irina.sapozhkova@gmail.com">Irina.sapozhkova@gmail.com</a><br />
                  Телефон: <a className="text-accent underline underline-offset-4" href="tel:+79015009901">+7 901 500-99-01</a>
                </address>
              </section>

              <div className="rounded-2xl bg-light-200 p-5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Перед публикацией и подключением форм нужно сверить этот текст с фактическими сервисами, местами хранения,
                уведомлением оператора и отдельными согласиями на рекламу, распространение, специальные категории или биометрию,
                если они применяются.
              </div>
            </div>
          </article>

          <DocumentToc variant="desktop" items={tocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </section>
  );
};
