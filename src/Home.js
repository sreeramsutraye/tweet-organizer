import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Zap } from 'lucide-react';
import Footer from './Footer';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="flex-1 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              Organize Your Twitter Content
            </div>
            
            <h1 className="mb-6 text-5xl font-bold text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
              Plan Your Tweets
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Week by Week
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
              Keep your content calendar tidy and ready to ship. Schedule, organize, and manage your tweets with ease.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/25 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                View Dashboard
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-black/5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                Weekly Planning
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Organize your tweets by day of the week. Plan ahead and stay on track with your content strategy.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-black/5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                Track Progress
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Mark tweets as completed and see your progress at a glance. Never lose track of what you've shared.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-black/5 dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                Easy Management
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Edit, copy, and delete tweets with ease. Your data is stored locally and synced automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

