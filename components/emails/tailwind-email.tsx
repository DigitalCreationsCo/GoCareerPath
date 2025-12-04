import { Tailwind, TailwindConfig } from '@react-email/components';
import * as React from 'react';
import * as tailwindConfig from '@/tailwind.config.js';

interface TailwindEmailProps {
  children: React.ReactNode;
}

export const TailwindEmail: React.FC<Readonly<TailwindEmailProps>> = ({ children }) => {
  return (
    <Tailwind
      config={tailwindConfig as TailwindConfig}
    >
      {children}
    </Tailwind>
  );
};
