import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { DocumentTocItem } from './DocumentToc';
import { LegalDocumentPage } from './LegalDocumentPage';

interface PolicyPageProps {
  onBack: () => void;
}

const tocItems: DocumentTocItem[] = [
  { id: 'soglasie', label: 'Согласие' },
  { id: 'dannye', label: 'Данные заявки' },
  { id: 'celi', label: 'Цели обработки' },
  { id: 'hranenie', label: 'Хранение и срок' },
  { id: 'otzyv', label: 'Отзыв согласия' },
];

export const PolicyPage: React.FC<PolicyPageProps> = ({ onBack }) => (
  <LegalDocumentPage
    icon={<ClipboardCheck className="h-6 w-6" />}
    onBack={onBack}
    title="Согласие на обработку данных онлайн-заявки"
    browserTitle="Согласие на обработку персональных данных | zagranici.ru"
    updatedAt="23.09.2026"
    tocItems={tocItems}
  >
    <section id="soglasie" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">1. Согласие</h2>
      <p>
        Заполняя форму или квиз на сайте zagranici.ru и устанавливая отдельную отметку согласия, я свободно, своей волей
        и в своём интересе даю индивидуальному предпринимателю Соболевой Ирине Андреевне согласие на обработку данных
        моей онлайн-заявки.
      </p>
      <p>
        Это согласие относится только к первичному обращению. Оно не заменяет согласие клиента на обработку материалов
        после заключения договора и не является согласием на рекламную рассылку.
      </p>
    </section>

    <section id="dannye" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">2. Данные онлайн-заявки</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>имя и фамилия;</li>
        <li>номер телефона;</li>
        <li>адрес электронной почты;</li>
        <li>имя пользователя или идентификатор в Telegram либо MAX;</li>
        <li>ответы и сведения, добровольно указанные в квизе или форме.</li>
      </ul>
      <p>Медицинские документы и учётные данные для входа в социальные сети через онлайн-заявку не запрашиваются.</p>
    </section>

    <section id="celi" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">3. Цели и действия с данными</h2>
      <p>
        Данные используются, чтобы принять обращение, связаться со мной, провести первичную консультацию, подобрать
        услугу и подготовить заключение договора. Допускаются сбор, запись, систематизация, накопление, хранение,
        уточнение, извлечение, использование, блокирование, удаление и уничтожение данных.
      </p>
      <p>
        Онлайн-заявка передаётся в CRM внутри Prodamus XL. В Telegram Оператору приходит только уведомление о новой
        заявке без её содержания.
      </p>
      <p>
        Если я выбираю Telegram как канал общения, сведения, передаваемые в этом мессенджере, могут обрабатываться за
        пределами территории Российской Федерации. Такая трансграничная передача осуществляется Оператором только после
        выполнения требований статьи 12 Федерального закона № 152-ФЗ.
      </p>
    </section>

    <section id="hranenie" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">4. Хранение и срок</h2>
      <p>
        Данные обрабатываются до достижения целей или отзыва согласия, но не более 3 лет с момента последнего
        взаимодействия. Затем они удаляются, уничтожаются или обезличиваются, если отсутствует иное законное основание.
      </p>
    </section>

    <section id="otzyv" className="scroll-mt-40 space-y-4 lg:scroll-mt-28">
      <h2 className="text-2xl font-bold text-dark dark:text-white md:text-3xl">5. Отзыв согласия</h2>
      <p>
        Отозвать согласие, уточнить или удалить данные можно письмом на{' '}
        <a className="text-accent underline underline-offset-4" href="mailto:Irina.sapozhkova@gmail.com">Irina.sapozhkova@gmail.com</a>.
        Отзыв не влияет на законность обработки, выполненной до его получения.
      </p>
      <address className="not-italic">
        <strong className="text-dark dark:text-white">ИП Соболева Ирина Андреевна</strong><br />
        ИНН: 343523500039 · ОГРНИП: 325774600606207<br />
        Адрес: 117628, г. Москва, Новоясеневский проспект, д. 12, корп. 1, кв. 293
      </address>
    </section>
  </LegalDocumentPage>
);
