"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface NewsArticle {
  title: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
  description: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Best practice: move key to NEXT_PUBLIC_NEWS_API in .env.local
  const API_KEY = "24197fdcedfc4ddca6fca5ee49a3ca01";
  const NEWS_URL = `https://newsapi.org/v2/everything?q=forex OR crypto OR bitcoin OR ethereum&sortBy=publishedAt&apiKey=${API_KEY}&language=en&pageSize=20`;

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(NEWS_URL);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <h1 className="text-2xl font-bold mb-6">📢 Live Market News</h1>

        {loading && <p>Fetching latest news...</p>}

        {articles.length === 0 && !loading && (
          <p className="text-red-500">No news available at the moment.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {article.description?.slice(0, 120)}...
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>{article.source.name}</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
