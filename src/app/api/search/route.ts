import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

interface ArxivEntry {
  id: string[];
  title: string[];
  published: string[];
  author: Array<{ name: string[] }>;
  summary: string[];
}

interface Paper {
  link: string;
  title: string;
  publish_time: string;
  authors: string[];
  abstract?: string;
  score: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  
  if (!keyword) {
    return NextResponse.json({ error: '请提供搜索关键词' }, { status: 400 });
  }

  try {
    console.log('开始搜索，关键词:', keyword);
    
    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=ti:${encodeURIComponent(keyword.toLowerCase())}&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending`
    );

    if (!response.ok) {
      throw new Error('arXiv API 请求失败');
    }

    const text = await response.text();
    console.log('API 返回原始数据:', text.substring(0, 200) + '...');

    // 使用 xml2js 解析 XML
    const result = await parseStringPromise(text);
    const entries = result.feed.entry || [];
    
    const papers: Paper[] = entries.map((entry: ArxivEntry) => ({
      link: entry.id[0],
      title: entry.title[0].trim(),
      publish_time: new Date(entry.published[0])
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, ''),
      authors: entry.author.map(author => author.name[0]),
      abstract: entry.summary[0].trim(),
      score: 1.0
    }));

    console.log('处理完成，返回论文数量:', papers.length);
    return NextResponse.json(papers);
  } catch (error) {
    console.error('arXiv API 错误:', error);
    return NextResponse.json({ error: '搜索失败，请稍后重试' }, { status: 500 });
  }
}