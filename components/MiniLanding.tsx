import React, { useEffect, useRef } from 'react';
import { Check, Send, UserRound } from 'lucide-react';
import { links } from '../config/links';
import { Footer } from './Footer';
import './MiniLanding.css';

const videoSrc = '/media/videos/safe-case-mini-hero.mp4';

const targetCases = [
  'После 5 отказов подряд',
  'После отказа с приглашением родственников в США',
  'При отсутствии истории поездок',
  'Со сложной семейной ситуацией',
  'После аннулирования предыдущих виз',
  'Подходит для «нестандартных» кейсов',
];

const articleContents = [
  'Полный алгоритм системы «Safe Case», по которому наши клиенты получают визы',
  'Что делать после нескольких отказов подряд',
  'Топ ошибок в DS-160, которые делают 90% заявителей',
  '6 мифов о визах США, которые будут стоить вам поездки',
  'Как именно мы превращаем отказы в одобрения',
  'Как «упаковать» сложный кейс в убедительную историю',
  '8 конкретных этапов до поездки в США',
  'Реальные кейсы превращения отказов в одобрения',
];

const stats = [
  ['600+', 'Успешных визовых кейсов', 'Включая сложные ситуации с отказами'],
  ['1000+', 'Проведённых консультаций', 'Индивидуальный подход к каждому'],
  ['87%', 'Успешных одобрений', 'Даже после предыдущих отказов'],
  ['12', 'Стран', 'Работаю с клиентами из 12 стран'],
  ['60 000+', 'Подписчиков', 'Аудитория в соцсетях'],
];

const containerClass =
  'mini:mx-auto mini:w-[calc(100%-2.5rem)] mini:max-w-[1160px] mini:sm:w-[calc(100%-3rem)] mini:max-[380px]:w-[calc(100%-2rem)]';

const eyebrowClass =
  'mini:mb-3 mini:text-xs mini:leading-[1.4] mini:font-extrabold mini:tracking-[0.14em] mini:uppercase';

const TelegramCta: React.FC<{ children: React.ReactNode; overlay?: boolean }> = ({ children, overlay = false }) => (
  <a
    className={
      overlay
        ? 'mini:inline-flex mini:min-h-12 mini:w-[calc(100%-2rem)] mini:items-center mini:justify-center mini:gap-2 mini:rounded-full mini:border mini:border-white/30 mini:bg-[rgba(37,99,235,0.92)] mini:px-5 mini:py-3 mini:text-center mini:text-[13px] mini:font-extrabold mini:tracking-[0.02em] mini:text-white mini:no-underline mini:shadow-[0_12px_32px_rgba(0,0,0,0.35)] mini:backdrop-blur-md mini:transition-[transform,box-shadow,background-color] mini:duration-300 mini:hover:-translate-y-1 mini:hover:bg-[#2563eb] mini:hover:shadow-[0_16px_38px_rgba(0,0,0,0.42)] mini:focus-visible:outline-3 mini:focus-visible:outline-offset-4 mini:focus-visible:outline-white mini:motion-reduce:transition-none'
        : 'mini:inline-flex mini:min-h-[54px] mini:w-full mini:max-w-[350px] mini:items-center mini:justify-center mini:gap-2.5 mini:rounded-full mini:bg-[linear-gradient(135deg,#2563eb,#5aaae5)] mini:px-[26px] mini:py-4 mini:text-center mini:text-sm mini:font-extrabold mini:tracking-[0.025em] mini:text-white mini:no-underline mini:shadow-[0_12px_30px_rgba(37,99,235,0.25)] mini:transition-[transform,box-shadow] mini:duration-500 mini:ease-out mini:hover:-translate-y-px mini:hover:shadow-[0_15px_34px_rgba(37,99,235,0.3)] mini:focus-visible:outline-3 mini:focus-visible:outline-offset-4 mini:focus-visible:outline-[#5aaae5] mini:motion-reduce:transition-none'
    }
    href={links.telegram.channel}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Send aria-hidden="true" size={17} strokeWidth={2.4} />
    <span>{children}</span>
  </a>
);

export const MiniLanding: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = 'Safe Case — короткий лендинг';

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      void video.play().catch(() => undefined);
    }
  }, []);

  return (
    <main className="mini:min-h-screen mini:w-full mini:overflow-hidden mini:bg-[#f4f7f9] mini:font-sans mini:text-[#324f5c] mini:isolate">
      <section className="mini:relative mini:overflow-hidden mini:bg-[#f4f7f9] mini:pt-10 mini:pb-14 mini:sm:py-[72px] mini:lg:py-20">
        <div
          className="mini:pointer-events-none mini:absolute mini:-top-[130px] mini:-right-[90px] mini:h-[440px] mini:w-[440px] mini:rounded-full mini:bg-[rgba(90,170,229,0.2)] mini:blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="mini:pointer-events-none mini:absolute mini:bottom-[-150px] mini:left-[-120px] mini:h-[360px] mini:w-[360px] mini:rounded-full mini:bg-[rgba(37,99,235,0.08)] mini:blur-[100px]"
          aria-hidden="true"
        />

        <div
          className={`${containerClass} mini:relative mini:z-10 mini:grid mini:grid-cols-1 mini:items-start mini:gap-9 mini:sm:grid-cols-[minmax(0,1fr)_240px] mini:sm:items-center mini:sm:gap-10 mini:lg:grid-cols-[minmax(0,1fr)_310px] mini:lg:gap-16`}
        >
          <div className="mini:[animation:mini-fade-up_0.65s_cubic-bezier(0.16,1,0.3,1)_both] mini:motion-reduce:[animation:none]">
            <h1 className="mini:mx-auto mini:m-0 mini:max-w-[820px] mini:text-center mini:font-serif mini:text-[1.62rem] mini:leading-[1.1] mini:font-extrabold mini:tracking-[-0.03em] mini:[text-wrap:balance] mini:sm:text-[clamp(2.35rem,5vw,3rem)] mini:sm:leading-[1.08] mini:sm:tracking-[-0.035em] mini:lg:text-[3.25rem]">
              Раскрыта формула одобрения визы США{' '}
              <span className="mini:font-extrabold mini:text-[#348fce]">
                «Safe&nbsp;Case»
              </span>
              , по которой консулы вручают визы россиянам в{' '}
              <strong className="mini:font-extrabold mini:text-[#348fce]">9&nbsp;из&nbsp;10</strong> случаев
            </h1>

            <p className="mini:mx-auto mini:mt-5 mini:mb-0 mini:max-w-[720px] mini:text-center mini:text-[15px] mini:leading-[1.65] mini:text-[#526776] mini:sm:text-base mini:lg:text-[17px]">
              Метод основан на <b className="mini:text-[#324f5c]">1000+ консультаций</b>, протестирован на{' '}
              <b className="mini:text-[#324f5c]">700 реальных анкетах</b> и подкреплён опытом лучших экспертов РФ.
            </p>

            <div className="mini:mt-6 mini:grid mini:max-w-[790px] mini:grid-cols-2 mini:gap-2 mini:max-[359px]:grid-cols-1 mini:sm:grid-cols-2 mini:lg:grid-cols-3">
              {targetCases.map((item) => (
                <div
                  className="mini:group mini:flex mini:min-h-[62px] mini:items-center mini:gap-2 mini:rounded-[13px] mini:border mini:border-[rgba(90,170,229,0.24)] mini:bg-[rgba(255,255,255,0.64)] mini:px-2.5 mini:py-2 mini:text-[11px] mini:leading-[1.35] mini:font-bold mini:shadow-[0_4px_14px_rgba(50,79,92,0.04)] mini:backdrop-blur-sm mini:transition-[transform,border-color,box-shadow,background-color] mini:duration-500 mini:ease-out mini:hover:-translate-y-px mini:hover:border-[rgba(90,170,229,0.48)] mini:hover:bg-white mini:hover:shadow-[0_7px_18px_rgba(50,79,92,0.075)] mini:motion-reduce:transition-none mini:sm:min-h-[48px] mini:sm:px-3 mini:sm:py-2.5 mini:sm:text-xs mini:lg:text-[13px]"
                  key={item}
                >
                  <span className="mini:inline-flex mini:h-5 mini:w-5 mini:flex-[0_0_20px] mini:items-center mini:justify-center mini:rounded-full mini:bg-[#22c55e] mini:text-white mini:transition-transform mini:duration-500 mini:ease-out mini:group-hover:scale-[1.04] mini:group-hover:rotate-[-2deg] mini:motion-reduce:transition-none mini:sm:h-[22px] mini:sm:w-[22px] mini:sm:flex-[0_0_22px]">
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mini:mt-6 mini:flex mini:max-w-[790px] mini:flex-col mini:items-center">
              <TelegramCta>Забрать в Telegram</TelegramCta>
              <div className="mini:mt-2.5 mini:flex mini:w-full mini:max-w-[350px] mini:items-center mini:justify-center mini:gap-2 mini:text-center mini:text-[13px] mini:font-bold mini:text-[#526776]">
                <span className="mini:flex mini:items-center mini:-space-x-2" aria-hidden="true">
                  <span className="mini:inline-flex mini:h-7 mini:w-7 mini:items-center mini:justify-center mini:rounded-full mini:border-2 mini:border-[#f4f7f9] mini:bg-[#dbeafe] mini:text-[#2563eb] mini:shadow-sm">
                    <UserRound size={14} strokeWidth={2.4} />
                  </span>
                  <span className="mini:inline-flex mini:h-7 mini:w-7 mini:items-center mini:justify-center mini:rounded-full mini:border-2 mini:border-[#f4f7f9] mini:bg-[#fce7d8] mini:text-[#d97706] mini:shadow-sm">
                    <UserRound size={14} strokeWidth={2.4} />
                  </span>
                  <span className="mini:inline-flex mini:h-7 mini:w-7 mini:items-center mini:justify-center mini:rounded-full mini:border-2 mini:border-[#f4f7f9] mini:bg-[#dcfce7] mini:text-[#16a34a] mini:shadow-sm">
                    <UserRound size={14} strokeWidth={2.4} />
                  </span>
                  <span className="mini:inline-flex mini:h-7 mini:w-7 mini:items-center mini:justify-center mini:rounded-full mini:border-2 mini:border-[#f4f7f9] mini:bg-[#f3e8ff] mini:text-[#9333ea] mini:shadow-sm">
                    <UserRound size={14} strokeWidth={2.4} />
                  </span>
                </span>
                <span>Уже забрали 785 человек</span>
              </div>
            </div>
          </div>

          <div className="mini:mx-auto mini:w-full mini:max-w-[250px] mini:[animation:mini-fade-up_0.75s_0.12s_cubic-bezier(0.16,1,0.3,1)_both] mini:motion-reduce:[animation:none] mini:sm:max-w-none">
            <div className="mini:relative mini:w-full mini:overflow-hidden mini:rounded-[26px] mini:border mini:border-[rgba(50,79,92,0.14)] mini:bg-[#142736] mini:shadow-[0_24px_58px_rgba(24,49,66,0.25)] mini:[aspect-ratio:9/16]">
              <video
                ref={videoRef}
                className="mini:pointer-events-none mini:block mini:h-full mini:w-full mini:scale-[1.012] mini:object-cover mini:blur-[0.7px]"
                src={videoSrc}
                poster="/media/shared/irina-video-preview-01.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
              />
              <div
                className="mini:pointer-events-none mini:absolute mini:inset-0 mini:bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_18%,rgba(15,23,42,0.2)_58%,rgba(15,23,42,0.78)_100%)]"
                aria-hidden="true"
              />
              <div className="mini:absolute mini:inset-x-0 mini:bottom-5 mini:flex mini:justify-center mini:sm:hidden">
                <TelegramCta overlay>Забрать в Telegram</TelegramCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mini:bg-[linear-gradient(90deg,#1d3844,#2e485f,#1d3844)] mini:py-[52px] mini:text-white mini:sm:py-16">
        <div className={containerClass}>
          <div className="mini:mb-6 mini:text-center">
            <h2 className="mini:m-0 mini:font-serif mini:text-[2rem] mini:leading-[1.12] mini:font-extrabold mini:sm:text-[clamp(2rem,4vw,3.2rem)]">
              Что внутри
            </h2>
          </div>

          <ul className="mini:m-0 mini:grid mini:list-none mini:grid-cols-1 mini:gap-x-[18px] mini:gap-y-1.5 mini:p-0 mini:sm:grid-cols-2">
            {articleContents.map((item) => (
              <li
                className="mini:group mini:flex mini:min-h-12 mini:items-center mini:gap-[11px] mini:rounded-xl mini:border mini:border-transparent mini:px-3 mini:py-2.5 mini:transition-[transform,background-color,border-color] mini:duration-500 mini:ease-out mini:hover:translate-x-px mini:hover:border-[rgba(255,255,255,0.07)] mini:hover:bg-[rgba(255,255,255,0.045)] mini:motion-reduce:transition-none"
                key={item}
              >
                <span
                  className="mini:h-[7px] mini:w-[7px] mini:flex-[0_0_7px] mini:rounded-full mini:bg-[#5aaae5] mini:shadow-[0_0_0_4px_rgba(90,170,229,0.12)] mini:transition-[transform,box-shadow] mini:duration-500 mini:ease-out mini:group-hover:scale-110 mini:group-hover:shadow-[0_0_0_5px_rgba(90,170,229,0.12)] mini:motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <p className="mini:m-0 mini:text-sm mini:leading-[1.5] mini:text-[rgba(255,255,255,0.9)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mini:bg-[#f4f7f9] mini:py-[56px] mini:sm:py-20 mini:lg:py-[88px]">
        <div className={containerClass}>
          <div className="mini:flex mini:flex-col mini:items-stretch mini:gap-7 mini:sm:grid mini:sm:grid-cols-[220px_minmax(0,1fr)] mini:sm:items-center mini:sm:gap-8 mini:lg:grid-cols-[290px_minmax(0,1fr)] mini:lg:gap-[52px]">
            <div className="mini:[aspect-ratio:1] mini:w-full mini:self-center mini:overflow-hidden mini:rounded-[26px] mini:border mini:border-[rgba(50,79,92,0.12)] mini:bg-[#f0f7fd] mini:shadow-[0_12px_34px_rgba(50,79,92,0.12)]">
              <img
                className="mini:block mini:h-full mini:w-full mini:object-cover mini:transition-transform mini:duration-700 mini:hover:scale-[1.025] mini:motion-reduce:transition-none"
                src="/media/pages/mini1/irina-about.jpg"
                alt="Ирина Соболева"
              />
            </div>
            <div>
              <p className={`${eyebrowClass} mini:text-[#348fce]`}>Автор статьи</p>
              <h2 className="mini:mt-0 mini:mb-4 mini:font-serif mini:text-[2rem] mini:leading-[1.12] mini:font-extrabold mini:sm:text-[clamp(2rem,4vw,3.2rem)]">
                Ирина Соболева
              </h2>
              <p className="mini:m-0 mini:max-w-[680px] mini:text-base mini:leading-[1.72] mini:text-[#526776] mini:sm:text-[17px]">
                Эксперт по визам США с опытом более <b className="mini:text-[#324f5c]">600 успешных кейсов</b>. За
                последние 4 года я разработала систему{' '}
                <span className="mini:font-extrabold mini:text-[#2563eb]">«Safe&nbsp;Case»</span>, которая помогает
                получить визу даже после нескольких отказов с вероятностью{' '}
                <b className="mini:text-[#324f5c]">87%</b>.
              </p>
            </div>
          </div>

          <div className="mini:mt-8 mini:flex mini:flex-col mini:border-y mini:border-[rgba(50,79,92,0.12)] mini:sm:mt-10 mini:sm:grid mini:sm:grid-cols-6 mini:sm:gap-4 mini:sm:border-0">
            {stats.map(([value, label, sub], index) => (
              <article
                className={`mini:flex mini:items-baseline mini:justify-between mini:gap-4 mini:border-b mini:border-[rgba(50,79,92,0.1)] mini:py-3 mini:last:border-b-0 mini:sm:block mini:sm:rounded-[20px] mini:sm:border mini:sm:bg-white mini:sm:p-[22px] mini:sm:shadow-[0_4px_12px_rgba(50,79,92,0.08)] mini:sm:transition-[transform,box-shadow] mini:sm:duration-300 mini:sm:hover:-translate-y-1 mini:sm:hover:shadow-[0_14px_28px_rgba(50,79,92,0.12)] mini:sm:motion-reduce:transition-none mini:sm:col-span-2 ${
                  index === 3 ? 'mini:sm:col-start-2' : ''
                } ${index === 4 ? 'mini:sm:col-start-4' : ''}`}
                key={label}
              >
                <strong className="mini:block mini:shrink-0 mini:font-sans mini:text-[25px] mini:leading-none mini:text-[#2563eb] mini:sm:text-[36px]">
                  {value}
                </strong>
                <div className="mini:min-w-0 mini:text-right mini:sm:text-left">
                  <h3 className="mini:m-0 mini:font-sans mini:text-[13px] mini:leading-[1.35] mini:font-bold mini:text-[#324f5c] mini:sm:mt-2.5 mini:sm:text-[15px]">
                    {label}
                  </h3>
                  <p className="mini:mt-1 mini:mb-0 mini:hidden mini:text-xs mini:leading-[1.45] mini:text-[#64748b] mini:sm:block mini:sm:text-[13px]">
                    {sub}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer compact />

    </main>
  );
};
