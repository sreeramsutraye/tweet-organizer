import React, { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  Plus,
  Copy,
  Check,
  CheckCircle,
  Circle,
  Edit2,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import './App.css';

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false);
  const dayMenuRef = useRef(null);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  useEffect(() => {
    const stored = localStorage.getItem('weeklyTweets');
    if (stored) {
      setTweets(JSON.parse(stored));
    }

    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    setSelectedDay(daysOfWeek[dayIndex]);
  }, []);

  useEffect(() => {
    localStorage.setItem('weeklyTweets', JSON.stringify(tweets));
  }, [tweets]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dayMenuRef.current && !dayMenuRef.current.contains(event.target)) {
        setIsDayMenuOpen(false);
      }
    };

    if (isDayMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDayMenuOpen]);

  const addTweet = () => {
    if (newTweet.trim() && selectedDay) {
      const tweet = {
        id: Date.now(),
        content: newTweet,
        day: selectedDay,
        createdAt: new Date().toISOString(),
        tweeted: false
      };
      setTweets(prev => [...prev, tweet]);
      setNewTweet('');
    }
  };

  const deleteTweet = (id) => {
    setTweets(tweets.filter(tweet => tweet.id !== id));
  };

  const toggleTweeted = (id) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, tweeted: !tweet.tweeted } : tweet
    ));
  };

  const startEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  const saveEdit = (id) => {
    if (editContent.trim()) {
      setTweets(tweets.map(tweet =>
        tweet.id === id ? { ...tweet, content: editContent } : tweet
      ));
    }
    setEditingId(null);
    setEditContent('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const copyTweet = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetAllTweets = () => {
    setTweets([]);
    setShowResetModal(false);
  };

  const getTweetsForDay = (day) => tweets.filter(tweet => tweet.day === day);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTweet();
    }
  };

  const tweetedCount = tweets.filter(t => t.tweeted).length;
  const totalCount = tweets.length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500 dark:text-blue-300">
                  Weekly Planner
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <img 
                    src="/icons/dashboard.png" 
                    alt="Dashboard icon" 
                    className="h-8 w-8"
                  />
                  <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Tweet Board</h1>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Keep your content calendar tidy and ready to ship.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Week
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-48" ref={dayMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsDayMenuOpen(prev => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
                >
                  <span>{selectedDay || 'Select day'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDayMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDayMenuOpen && (
                  <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                    <ul className="max-h-64 overflow-y-auto py-2">
                      {daysOfWeek.map(day => (
                        <li key={day}>
                          <button
                            className={`flex w-full items-center justify-between px-4 py-2 text-sm transition hover:bg-blue-50 dark:hover:bg-slate-800 ${selectedDay === day ? 'text-blue-600 dark:text-blue-300' : 'text-slate-600 dark:text-slate-200'}`}
                            onClick={() => {
                              setSelectedDay(day);
                              setIsDayMenuOpen(false);
                            }}
                          >
                            {day}
                            {selectedDay === day && <Check className="h-4 w-4" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <textarea
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What would you like to tweet?"
                className="min-h-[60px] flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
                rows={2}
                maxLength={280}
              />

              <button
                onClick={addTweet}
                disabled={!newTweet.trim() || !selectedDay}
                className="flex h-fit items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {newTweet.length}/280 characters
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {daysOfWeek.map(day => {
            const dayTweets = getTweetsForDay(day);
            const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
            const isToday = day === daysOfWeek[currentDayIndex];

            return (
              <div
                key={day}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-black/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {day}
                    </p>
                    {isToday && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                        Today
                      </span>
                    )}
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {dayTweets.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {dayTweets.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
                      Nothing scheduled
                    </div>
                  ) : (
                    dayTweets.map(tweet => {
                      const tweetedStyles = tweet.tweeted
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200'
                        : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

                      return (
                        <div
                          key={tweet.id}
                          className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:shadow-none ${tweetedStyles}`}
                        >
                          {editingId === tweet.id ? (
                            <div className="space-y-3">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-blue-600/40 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                                rows={3}
                                maxLength={280}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveEdit(tweet.id)}
                                  className="flex-1 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="mb-3 flex items-start gap-3">
                                <button
                                  onClick={() => toggleTweeted(tweet.id)}
                                  className="rounded-full border border-slate-300 p-1 text-slate-400 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-600 dark:text-slate-500 dark:hover:border-blue-400 dark:hover:text-blue-300"
                                  title={tweet.tweeted ? 'Mark as not tweeted' : 'Mark as tweeted'}
                                >
                                  {tweet.tweeted ? (
                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                  ) : (
                                    <Circle className="h-5 w-5" />
                                  )}
                                </button>
                                <p className={`flex-1 whitespace-pre-wrap text-sm ${tweet.tweeted ? 'line-through opacity-70' : ''}`}>
                                  {tweet.content}
                                </p>
                              </div>

                              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <span>
                                  {new Date(tweet.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => startEdit(tweet.id, tweet.content)}
                                    className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                                    title="Edit tweet"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => copyTweet(tweet.id, tweet.content)}
                                    className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                                    title="Copy tweet"
                                  >
                                    {copiedId === tweet.id ? (
                                      <Check className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => deleteTweet(tweet.id)}
                                    className="rounded-full p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                                    title="Delete tweet"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Tweets</p>
              <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">{totalCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-slate-500">Tweeted</p>
              <p className="mt-2 text-4xl font-semibold text-emerald-600 dark:text-emerald-300">{tweetedCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-slate-500">Pending</p>
              <p className="mt-2 text-4xl font-semibold text-amber-600 dark:text-amber-300">{totalCount - tweetedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 dark:border-red-500/30 dark:bg-red-500/10">
                <RotateCcw className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Reset All Tweets?</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                This will permanently delete every tweet for the week. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={resetAllTweets}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
