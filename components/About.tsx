import React from 'react';
import { Section } from './ui/Section';
import { Briefcase, Users, Award, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { value: "300+", label: "Успешных визовых кейсов", sub: "Включая сложные ситуации с отказами", icon: Briefcase },
    { value: "1000+", label: "Проведенных консультаций", sub: "Индивидуальный подход к каждому клиенту", icon: Users },
    { value: "87%", label: "Успешных одобрений", sub: "Даже после предыдущих отказов", icon: Award },
    { value: "12", label: "Стран", sub: "Где работают мои клиенты", icon: MapPin },
  ];

  return (
    <Section id="about" className="bg-white dark:bg-dark-deep rounded-t-[3rem] -mt-10 relative z-20 shadow-[-0px_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-none">
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Text Content */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white text-center lg:text-left">Обо мне</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-normal">
            <p>
              Я – Ирина Соболева, эксперт по визам США с опытом более 300 успешных кейсов. За последние 2,5 года я разработала систему «Safe Case», которая помогает получить визу даже после нескольких отказов с вероятностью 87%.
            </p>
            <p>
              Мой путь начался в крупнейшем визовом агентстве России, где я отвечала за самые безнадежные кейсы. Каждый день я сталкивалась с историями, от которых опускались руки даже у опытных консультантов. 
            </p>
            <p>
              Это подтолкнуло меня к созданию собственной методологии, которая работает даже в самых сложных случаях.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-light dark:bg-dark-card p-4 md:p-5 lg:p-6 rounded-3xl hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between h-full group relative gap-4">
                <div className="flex justify-between items-start lg:items-center mb-3 lg:mb-0 w-full lg:w-auto gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center text-accent group-hover:scale-110 transition-transform flex-shrink-0 order-last lg:order-first">
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-dark dark:text-white leading-none lg:w-24">{stat.value}</div>
                </div>
                <div className="lg:flex-grow lg:pl-4 lg:border-l lg:border-slate-200 dark:lg:border-slate-700">
                  <div className="text-sm md:text-base lg:text-lg font-bold text-dark dark:text-slate-200 mb-1 leading-tight">{stat.label}</div>
                  <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-snug">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};