import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex w-full flex-grow flex-col items-center justify-center">
      {children}
    </main>
  );
}
