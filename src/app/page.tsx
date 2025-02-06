'use client';

import { useState, useEffect } from 'react';
import PaperCard from '@/components/PaperCard';

interface Paper {
  link: string;
  title: string;
  publish_time: string;
  authors: string[];
  abstract?: string;
}

export default function SearchPage() {
  const [mounted, setMounted] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('搜索失败');
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error('搜索出错:', error);
      alert('搜索失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const sortedPapers = [...papers].sort((a, b) => {
    const dateA = parseInt(a.publish_time);
    const dateB = parseInt(b.publish_time);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">arXiv 论文搜索</h1>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="输入关键词搜索 arXiv 论文..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? '搜索中...' : '搜索'}
              </button>
            </div>
            
            {papers.length > 0 && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">排序顺序：</label>
                <select
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                >
                  <option value="desc">最新发表</option>
                  <option value="asc">最早发表</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">搜索中...</div>
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600">未检索到任何相关论文</div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPapers.map((paper, index) => (
              <PaperCard key={index} paper={paper} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}