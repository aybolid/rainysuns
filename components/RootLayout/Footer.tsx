import React from "react";

interface FooterProps {
  copyYear: string;
}

export default function Footer({ copyYear }: FooterProps) {
  return (
    <footer className="flex w-full items-center justify-center">
      <div className="container flex w-full flex-col items-center justify-center">
        <small>&copy; {copyYear} - Weather App</small>
        <small>
          Powered by{" "}
          <a
            className="underline"
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
