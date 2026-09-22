import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ServicePackage } from '../types';
import { links } from '../config/links';
import { sendMetrikaGoal } from '../analytics/metrika';

export const Services: React.FC = () => {
  const [supportEnabled, setSupportEnabled] = useState(false);
  const [managerSupportEnabled, setManagerSupportEnabled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0 });
  const didDragRef = useRef(false);
  const initialPositionedRef = useRef(false);
  const userInteractedRef = useRef(false);

  const scrollToContact = () => {
     sendMetrikaGoal('ym-open-chat', { messenger: 'telegram', placement: 'services' });
     window.open(links.telegram.siteInvite, '_blank', 'noopener,noreferrer');
  };

  const consultationFeatures = [
    "Разбор всех ваших вопросов по получению визы",
    "Стратегия подачи и выбор консульства",
    "Рекомендации по анкете и собеседованию",
    "Текстовое резюме встречи под ваш кейс"
  ];

  const consultationExtraFeatures = [
    "Проверка анкеты DS-160 и помощь с формулировками",
    "2 недели поддержки в чате"
  ];

  const managerBaseFeatures = [
    "Консультация по кейсу и разработка стратегии",
    "Заполнение формы DS-160",
    "Создание/перенос личного кабинета",
    "Проверка и согласование внесенных данных",
    "Помощь в подготовке пакета документов",
    "Запись вручную на собеседование",
    "Комплект материалов для подготовки к собеседованию.",
    "Консультация по подготовке к собеседованию в Посольстве на русском языке",
    "Поиск переводчика при необходимости",
    "Отслеживание статуса готовности документов"
  ];

  const managerExtraFeatures = [
    "Повторная подача в случае отказа",
    "Перевод документов для подачи (не нотариальный)"
  ];

  const services: ServicePackage[] = [
    {
      title: "Визовое сопровождение с персональным менеджером",
      priceRub: managerSupportEnabled ? "40 000₽ / 500$ (за взрослого)" : "30 000₽ / 400$ (за взрослого)",
      priceUsd: managerSupportEnabled ? "15 000₽ / 200$ (за ребёнка)" : "10 000₽ / 150$ (за ребёнка)",
      features: [...managerBaseFeatures, ...managerExtraFeatures],
      notes: "Бот и консульские сборы не включены",
      isManager: true,
      isPopular: true,
      layoutClass: "md:order-2",
    },
    {
      title: "VIP Сопровождение с экспертом Ириной Соболевой",
      priceRub: "55 000₽ / 650$ (за взрослого)",
      priceUsd: "15 000₽ / 200$ (за ребёнка)",
      features: [
        "Все, что входит в тариф «Визовое сопровождение с персональным менеджером»",
        "Личное ведение",
        "Заполнение DS-160",
        "Подготовка документов и переводы",
        "Консультация по подготовке к собеседованию в Посольстве на русском языке",
        "Персональные записи консультаций",
        "Подготовка к админ. проверке",
        "Повторное сопровождение после отказа"
      ],
      notes: "Бот и консульские сборы не включены. Решение принимает консульство.",
      result: "Рекомендуется для кейсов после отказов и других сложных случаев",
      isVip: true,
      layoutClass: "md:order-3",
    },
    {
      title: "Консультация с менеджером",
      priceRub: supportEnabled ? "15 000₽" : "8 000₽",
      priceUsd: "",
      format: "1 час | Online",
      features: [...consultationFeatures, ...consultationExtraFeatures], // Show all features to allow fading logic
      result: supportEnabled
        ? "Работаем даже со сложными отказными кейсами"
        : "Результат: Четкое понимание ваших шансов, стратегия действий и уверенность в процессе получения визы",
      isVip: false,
      layoutClass: "md:order-1",
    }
  ];

  const scrollToService = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = servicesRef.current;
    const card = container?.querySelectorAll<HTMLElement>('[data-service-card]')[index];

    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = container.scrollLeft + cardRect.left - containerRect.left - (container.clientWidth - card.clientWidth) / 2;

    container.scrollTo({ left, behavior });
    setActiveService(index);
  };

  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;

    const container = servicesRef.current;
    if (!container) return;

    const positionPopularService = () => {
      if (initialPositionedRef.current || userInteractedRef.current) return;
      if (container.scrollWidth <= container.clientWidth + 20) return;

      scrollToService(0, 'auto');
      initialPositionedRef.current = true;
    };

    const observer = new ResizeObserver(positionPopularService);
    observer.observe(container);
    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(positionPopularService));
    const timeout = window.setTimeout(positionPopularService, 500);
    window.addEventListener('load', positionPopularService);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener('load', positionPopularService);
    };
  }, []);

  const selectService = (index: number) => {
    userInteractedRef.current = true;
    scrollToService(index);
  };

  const updateActiveService = () => {
    const container = servicesRef.current;
    if (!container) return;

    const center = container.getBoundingClientRect().left + container.clientWidth / 2;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-service-card]'));
    const closestIndex = cards.reduce((bestIndex, card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      const bestRect = cards[bestIndex].getBoundingClientRect();
      const bestDistance = Math.abs(bestRect.left + bestRect.width / 2 - center);
      return distance < bestDistance ? index : bestIndex;
    }, 0);

    setActiveService(closestIndex);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(min-width: 768px)').matches) return;

    userInteractedRef.current = true;
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
    didDragRef.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { pointerId, startX, startScrollLeft } = dragStateRef.current;
    if (pointerId !== event.pointerId) return;

    const distance = event.clientX - startX;
    if (Math.abs(distance) < 6 && !didDragRef.current) return;

    didDragRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.scrollLeft = startScrollLeft - distance;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) return;
    dragStateRef.current.pointerId = -1;
    updateActiveService();
  };

  return (
    <Section className="bg-white dark:bg-dark-deep" id="services">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dark dark:text-white uppercase">Услуги</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-3xl">Выберите оптимальный вариант сопровождения</p>
      </div>

      <div className="mb-4 flex items-center justify-between md:hidden">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Листайте тарифы свайпом</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => selectService(Math.max(0, activeService - 1))}
            disabled={activeService === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-dark shadow-sm disabled:opacity-30 dark:border-slate-700 dark:bg-dark-card dark:text-white"
            aria-label="Предыдущий тариф"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => selectService(Math.min(services.length - 1, activeService + 1))}
            disabled={activeService === services.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-dark shadow-sm disabled:opacity-30 dark:border-slate-700 dark:bg-dark-card dark:text-white"
            aria-label="Следующий тариф"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={servicesRef}
        className="flex touch-pan-y cursor-grab gap-4 overflow-x-auto overscroll-x-contain hide-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-4 pt-5 active:cursor-grabbing md:grid md:grid-cols-2 md:touch-auto md:cursor-auto md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:pt-0 lg:grid-cols-3 md:gap-6 max-w-7xl mx-auto"
        aria-label="Тарифы: листайте карточки свайпом"
        onScroll={updateActiveService}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={(event) => {
          if (!didDragRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          didDragRef.current = false;
        }}
      >
        {services.map((service, idx) => (
          <div 
            key={idx} 
            data-service-card
            className={`${service.layoutClass || ''}
              relative w-[88%] flex-none snap-center p-6 rounded-3xl flex flex-col h-full transition-transform hover:-translate-y-1 duration-300 md:w-auto md:min-w-0
              ${service.isPopular
                ? 'bg-light-200 dark:bg-dark-card shadow-xl ring-2 ring-accent md:scale-[1.03] z-10'
                : 'bg-white dark:bg-dark-card shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md'
              }
            `}
          >
            {service.isPopular && (
              <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max shadow-lg ring-2 ring-white dark:ring-dark-card">
                <Star className="w-3 h-3 fill-current" />
                Популярное
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-base leading-tight font-bold text-dark dark:text-white mb-4 min-h-[3.5rem] flex items-center md:text-lg">{service.title}</h3>
              <div className="flex flex-col gap-1">
                {(service.isManager || service.isVip) && <div className="text-sm font-semibold text-dark/80 dark:text-slate-300">Стоимость услуги:</div>}
                <div className="whitespace-nowrap text-[clamp(1rem,4.2vw,1.5rem)] font-bold leading-tight text-accent">{service.priceRub}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{service.priceUsd}</div>
                {service.format && <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{service.format}</div>}
              </div>
            </div>

            {/* Toggle for Consultation (First Card) */}
            {!service.isManager && !service.isVip && (
                <div className="mb-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={supportEnabled}
                                onChange={() => setSupportEnabled(!supportEnabled)}
                            />
                            <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-accent transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                        </div>
                        <span className="text-sm font-semibold text-dark dark:text-slate-200">Хочу 2 недели поддержки</span>
                    </label>
                </div>
            )}

            {/* Toggle for Manager Support (Second Card) */}
            {/* Using isManager flag or checking title/index */}
            {service.isManager && (
                <div className="mb-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={managerSupportEnabled}
                                onChange={() => setManagerSupportEnabled(!managerSupportEnabled)}
                            />
                            <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-accent transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                        </div>
                        <span className="text-sm font-semibold text-dark dark:text-slate-200">Хочу полный пакет</span>
                    </label>
                </div>
            )}

            <div className="flex-grow mb-8">
               <h4 className="text-sm font-semibold text-dark dark:text-white mb-3">Что входит:</h4>
               <ul className="space-y-3">
                 {service.features.map((feature, fIdx) => {
                   // Logic for styling features in the Consultation and Manager cards
                   let isExtraFeature = false;
                   let isFaded = false;
                   let isBold = false;

                   if (!service.isManager && !service.isVip) { // Consultation card
                     isExtraFeature = !consultationFeatures.includes(feature);
                     if (isExtraFeature) {
                       if (supportEnabled) {
                         isBold = true;
                       } else {
                         isFaded = true;
                       }
                     }
                   } else if (service.isManager) { // Manager card
                     isExtraFeature = managerExtraFeatures.includes(feature);
                     if (isExtraFeature) {
                       if (managerSupportEnabled) {
                         isBold = true; // Bright and bold when enabled
                       } else {
                         isFaded = true; // Faded when disabled
                       }
                     }
                   }

                   return (
                     <li 
                       key={fIdx} 
                       className={`flex items-start gap-3 text-sm transition-all duration-300
                         ${isFaded ? 'opacity-30 text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}
                         ${isBold ? 'font-bold text-dark dark:text-white scale-[1.02] origin-left' : ''}
                       `}
                     >
                       <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isFaded ? 'text-slate-300 dark:text-slate-700' : 'text-green-500'}`} />
                       <span className="leading-tight">{feature}</span>
                     </li>
                   );
                 })}
               </ul>
            </div>

            <div className="space-y-4 mt-auto">
              {service.result && (
                <div className="p-3 bg-primary/10 dark:bg-primary/5 rounded-xl text-xs text-dark/80 dark:text-slate-300 italic border border-primary/20">
                  {service.result}
                </div>
              )}
              {service.notes && (
                <div className="flex items-start gap-1 text-xs text-red-500 font-medium">
                  <span>❗️</span>
                  <span>{service.notes}</span>
                </div>
              )}
              <Button 
                variant={service.isPopular ? 'primary' : 'outline'}
                fullWidth 
                onClick={scrollToContact}
              >
                Записаться
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2 md:hidden" aria-label={`Тариф ${activeService + 1} из ${services.length}`}>
        {services.map((service, index) => (
          <button
            key={service.title}
            type="button"
            onClick={() => selectService(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeService ? 'w-7 bg-accent' : 'w-2.5 bg-slate-300 dark:bg-slate-700'}`}
            aria-label={`Показать тариф ${index + 1}: ${service.title}`}
          />
        ))}
      </div>
    </Section>
  );
};
