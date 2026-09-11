import React from 'react';
import { Section } from './ui/Section';
import { Briefcase, Users, Award, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { value: "600+", label: "Успешных визовых кейсов", sub: "Включая сложные ситуации с отказами", icon: Briefcase },
    { value: "2 000+", label: "Проведенных консультаций", sub: "Индивидуальный подход к каждому клиенту", icon: Users },
    { value: "87%", label: "Успешных одобрений", sub: "Даже после предыдущих отказов", icon: Award },
    { value: "12", label: "Стран", sub: "Где работают мои клиенты", icon: MapPin },
  ];

  return (
    <Section id="about" className="rounded-t-[3rem] -mt-10 relative z-20">
      <div className="bg-dark dark:bg-dark-card rounded-[1.75rem] md:rounded-[2.5rem] p-5 sm:p-7 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

          {/* Text Content */}
          <div className="lg:col-span-5 space-y-5 text-left min-w-0">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center lg:text-left">Обо мне</h2>
            <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                Я — Ирина Соболева, эксперт по визам США. Работаю с 2022 года: за это время я провела более 2 000 консультаций и помогла получить визу более чем 600 клиентам.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-5">
              {stats.map((stat, idx) => (
                <div key={idx} className="grid h-full min-w-0 grid-cols-[6rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:grid-cols-[7rem_minmax(0,1fr)] md:gap-4 md:rounded-3xl md:p-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:p-6 group relative">
                  <div className="flex min-w-0 items-center gap-3 md:gap-4">
                    <div className="hidden w-10 h-10 md:flex lg:w-12 lg:h-12 rounded-2xl bg-white/10 border border-white/20 items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
                      <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:w-24 lg:text-3xl font-extrabold text-white leading-none">{stat.value}</div>
                  </div>
                  <div className="min-w-0 border-l border-white/20 pl-3 md:pl-4">
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-1 leading-tight">{stat.label}</div>
                    <div className="text-xs md:text-sm text-slate-300 leading-snug">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};
