import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  children, 
  containerClassName = '' 
}) => {
  return (
    <section id={id} className={`py-8 md:py-12 ${className}`}>
      <div className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};