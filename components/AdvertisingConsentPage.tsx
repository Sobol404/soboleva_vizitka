import React from 'react';
import { MailCheck } from 'lucide-react';
import { DocumentTocItem } from './DocumentToc';
import { LegalDocumentPage } from './LegalDocumentPage';

interface AdvertisingConsentPageProps {
  onBack: () => void;
}

const tocItems: DocumentTocItem[] = [
  { id: 'soglasie', label: 'Согласие' },
  { id: 'kanaly', label: 'Каналы и содержание' },
  { id: 'dannye', label: 'Используемые данные' },
  { id: 'otzyv', label: 'Как отказаться' },
];

export const AdvertisingConsentPage: React.FC<AdvertisingConsentPageProps> = ({ onBack }) => (
  <LegalDocumentPage
    icon={<MailCheck className="h-6 w-6" />}
    onBack={onBack}
    title="Согласие на получение рекламных сообщений"
    browserTitle="Согласие на рекламу | zagranici.ru"
    updatedAt="23.09.2026"
    tocItems={tocItems}
  >
    <section id="soglasie" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">1. Согласие</h2>
      <p>
        Я даю индивидуальному предпринимателю Соболевой Ирине Андреевне предварительное согласие на получение рекламных
        и информационных сообщений об услугах Оператора и материалах сайта zagranici.ru. Согласие является добровольным, оформляется отдельной отметкой и не является
        условием получения консультации или заключения договора.
      </p>
      <p>
        Согласие относится только к рекламным и маркетинговым сообщениям. Сервисные уведомления по моей заявке или
        договору направляются по основаниям, связанным с обработкой обращения и исполнением договора, и не заменяют это
        согласие.
      </p>
    </section>

    <section id="kanaly" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">2. Каналы и содержание сообщений</h2>
      <p>Сообщения могут направляться по адресу электронной почты, а также через ботов Telegram и MAX.</p>
      <p>
        В рассылку могут входить новости, полезные материалы, напоминания, предложения об услугах, специальных условиях
        и мероприятиях Оператора. Частота сообщений определяется Оператором с учётом выбранного канала.
      </p>
    </section>

    <section id="dannye" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">3. Используемые данные</h2>
      <p>
        Для рассылки могут использоваться имя, адрес электронной почты, номер телефона и идентификатор пользователя в
        Telegram или MAX — только в зависимости от выбранного пользователем канала. Содержание клиентских материалов
        для рекламной рассылки не используется.
      </p>
    </section>

    <section id="otzyv" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">4. Срок и отказ от рассылки</h2>
      <p>
        Согласие действует до его отзыва. Отказаться можно по ссылке в письме, командой отписки в соответствующем боте
        либо обращением на <a className="text-accent underline underline-offset-4" href="mailto:Irina.sapozhkova@gmail.com">Irina.sapozhkova@gmail.com</a>.
        После получения отказа рекламные сообщения по выбранному каналу прекращаются.
      </p>
    </section>
  </LegalDocumentPage>
);
