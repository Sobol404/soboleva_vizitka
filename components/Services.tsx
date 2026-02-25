import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, Star } from 'lucide-react';
import { ServicePackage } from '../types';

export const Services: React.FC = () => {
  const [supportEnabled, setSupportEnabled] = useState(false);
  const [managerSupportEnabled, setManagerSupportEnabled] = useState(false);

  const scrollToContact = () => {
     window.open('https://t.me/m/e1XHDdGVNDAy', '_blank');
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
    "Консультация и стратегия",
    "Заполнение формы DS-160",
    "Создание/перенос личного кабинета",
    "Помощь с документами",
    "Запись вручную на собеседование",
    "Материалы для подготовки",
    "Консультация перед интервью (RU)",
    "Поиск переводчика",
    "Отслеживание статуса"
  ];

  const managerExtraFeatures = [
    "Подготовка к админ. проверке",
    "Гарантия повторной подачи бесплатно",
    "Подготовка документов и переводов"
  ];

  const services: ServicePackage[] = [
    {
        title: "Консультация с менеджером",
        priceRub: supportEnabled ? "15 000₽" : "8 000₽",
        priceUsd: "",
        format: "1 час | Online",
        features: [...consultationFeatures, ...consultationExtraFeatures], // Show all features to allow fading logic
        result: supportEnabled 
            ? "Работаем даже со сложными отказными кейсами" 
            : "Результат: Четкое понимание ваших шансов, стратегия действий и уверенность в процессе получения визы",
        isVip: false
    },
    {
      title: "Визовое сопровождение с персональным менеджером",
      priceRub: managerSupportEnabled ? "40 000₽ (за взрослого)" : "30 000₽ (за взрослого)",
      priceUsd: "10 000₽ (за ребенка)",
      features: [...managerBaseFeatures, ...managerExtraFeatures],
      notes: "Бот и консульские сборы не включены",
      isManager: true // Custom flag to identify this card
    },
    {
      title: "VIP Сопровождение с экспертом Ириной Соболевой",
      priceRub: "55 000₽ (за взрослого)",
      priceUsd: "15 000₽ (за ребенка)",
      features: [
        "Личное ведение экспертом",
        "Профессиональное заполнение DS-160",
        "Подготовка документов и переводы",
        "Консультация перед интервью (RU/EN)",
        "Персональные записи консультаций",
        "Подготовка к админ. проверке",
        "Гарантия повторной подачи бесплатно"
      ],
      notes: "Бот и консульские сборы не включены. Гарантия результата.",
      result: "Максимальные шансы с персональной поддержкой эксперта на всех этапах",
      isVip: true
    }
  ];

  return (
    <Section className="bg-white dark:bg-dark-deep" id="services">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white uppercase">Услуги</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-xl md:text-3xl">Выберите оптимальный вариант сопровождения</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className={`
              relative p-6 rounded-3xl flex flex-col h-full transition-transform hover:-translate-y-1 duration-300
              ${service.isVip 
                ? 'bg-light-200 dark:bg-dark-card shadow-xl ring-2 ring-accent scale-105 z-10 order-first md:order-last xl:order-none' 
                : 'bg-white dark:bg-dark-card shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md'
              }
            `}
          >
            {service.isVip && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Популярное
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-dark dark:text-white mb-4 min-h-[3.5rem] flex items-center">{service.title}</h3>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold text-accent">{service.priceRub}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{service.priceUsd}</div>
                {service.format && <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{service.format}</div>}
              </div>
            </div>

            {/* Toggle for Consultation (First Card) */}
            {idx === 0 && (
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
            {idx === 1 && (
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

                   if (idx === 0) { // Consultation card
                     isExtraFeature = !consultationFeatures.includes(feature);
                     if (isExtraFeature) {
                       if (supportEnabled) {
                         isBold = true;
                       } else {
                         isFaded = true;
                       }
                     }
                   } else if (idx === 1) { // Manager card
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
                variant={service.isVip ? 'primary' : 'outline'} 
                fullWidth 
                onClick={scrollToContact}
              >
                Записаться
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};