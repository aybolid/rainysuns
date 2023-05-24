import React from 'react';

interface FooterProps {
  copyYear: string;
}

export default function Footer({ copyYear }: FooterProps) {
  return (
    <footer className="w-full flex justify-center items-center">
      <div className="container w-full flex flex-col justify-center items-center">
        <small>&copy; {copyYear} - Weather App</small>
        <small>
          Powered by{' '}
          <a
            className='underline'
            target="_blank"
            rel="noopener noreferrer"
            href="https://open-meteo.com/"
          >
            Open-Meteo API
          </a>
        </small>
      </div>
    </footer>
  );
}
