// Import React and necessary components
import React, { ReactHTMLElement, ReactNode, ReactSVG } from 'react';

// Define an interface for the component props
interface CustomCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

// Create a functional component with TypeScript
export const CustomCard: React.FC<CustomCardProps> = ({ title, value, subtitle }) => {
  return (
    <div>
      <p className="text-brandLight/90 bg-brandLight/10 px-4 py-1 mb-4 rounded-full inline-flex items-center font-medium md:text-xl">{title}</p>
      <p className="text-3xl xl:text-4xl font-bold text-white font-mono px-4 flex flex-col">{value} XCH <span className="text-sm font-normal text-brandLight/90 whitespace-nowrap">{subtitle}</span></p>
  </div>
  );
};
