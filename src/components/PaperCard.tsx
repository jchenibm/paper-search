'use client';

import { useState } from 'react';

interface Paper {
  link: string;
  title: string;
  publish_time: string;
  authors: string[];
  abstract?: string;
}

interface PaperCardProps {
  paper: Paper;
}

function formatAuthors(authors: string[], maxLength: number = 200) {
  const joined = authors.join(', ');
  if (joined.length <= maxLength) {
    return joined;
  }
  // 找到最后一个完整的作者名字，确保不会截断名字
  let lastIndex = joined.lastIndexOf(', ', maxLength);
  if (lastIndex === -1) {
    lastIndex = maxLength;
  }
  return `${joined.substring(0, lastIndex)} 等 ${authors.length} 位作者`;
}

export default function PaperCard({ paper }: PaperCardProps) {
  const [showModal, setShowModal] = useState(false);
  const formattedDate = paper.publish_time.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  
  // 生成 PDF 链接
  const pdfLink = paper.link.replace('arxiv.org/abs/', 'arxiv.org/pdf/');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-[200px] flex flex-col">
      <div className="flex justify-between items-start">
        <h2 
          className="text-lg font-semibold text-gray-800 mb-2 flex-grow cursor-pointer line-clamp-2"
          onClick={() => setShowModal(true)}
          title={paper.title}  // 添加 title 属性来显示 tooltip
        >
          {paper.title}
        </h2>
      </div>
      
      <div className="text-sm text-gray-600 mb-2 line-clamp-3 overflow-hidden">
        {formatAuthors(paper.authors)}
      </div>
      
      <div className="mt-auto flex justify-between items-center">
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          查看详情
        </a>
        <span className="text-sm text-gray-500">
          发表于: {formattedDate}
        </span>
      </div>

      {/* Modal 部分保持不变，但在这里显示完整的作者列表 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                <span className="font-bold">发布时间:</span> {formattedDate}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">作者:</span> {paper.authors.join(', ')}
              </p>
            </div>
            {paper.abstract && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">摘要</h3>
                <p className="text-gray-700 mb-4">{paper.abstract}</p>
              </div>
            )}
            <div className="flex gap-4">
              <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                论文页面
              </a>
              <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                打开PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}