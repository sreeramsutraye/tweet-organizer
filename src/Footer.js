import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Tweet Organizer. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

