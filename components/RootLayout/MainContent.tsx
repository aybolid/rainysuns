import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="w-full flex-grow flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
