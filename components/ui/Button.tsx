import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent";
  
  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 button-glint",
    secondary: "bg-white text-dark hover:bg-light-200 border border-slate-200 shadow-sm",
    outline: "bg-transparent border-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-950/30"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
