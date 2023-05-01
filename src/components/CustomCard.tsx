// Import React and necessary components
import React, { ReactHTMLElement, ReactNode, ReactSVG } from 'react';

// Define an interface for the component props
interface CustomCardProps {
  title: string;
  value: string;
  subtitle?: string;
  loading?: boolean;
}

// Create a functional component with TypeScript
export const CustomCard: React.FC<CustomCardProps> = ({ title, value, subtitle, loading }) => {
  return (
    <div>
      <p className="text-brandLight/90 bg-brandLight/10 px-4 py-1 mb-4 rounded-full inline-flex items-center font-medium md:text-xl">
        <span className={loading ? 'invisible' : 'animate-fadeIn'}>{title}</span>
      </p>
      <p className="text-3xl xl:text-4xl font-bold text-white font-mono px-4 flex flex-col">
        <span className={loading ? 'invisible' : 'animate-fadeIn'}>{value}</span>
        <span className="text-sm font-normal text-brandLight/90 whitespace-nowrap">
          <span className={loading ? 'invisible' : 'animate-fadeIn'}>{subtitle}</span>
        </span>
      </p>
  </div>
  );
};
