import React from 'react';

interface FooterProps {
  copyYear: string;
}

export default function Footer({ copyYear }: FooterProps) {
  return (
    <footer className="w-full flex justify-center items-center">
      <div className="container w-full flex justify-center items-center">
        <small>&copy; {copyYear} - Weather App</small>
      </div>
    </footer>
  );
}
