import arxiv
import json
import os

def fetch_papers(keyword, max_results=100):
    # 创建搜索客户端
    client = arxiv.Client()
    
    # 构建搜索查询
    search = arxiv.Search(
        query=keyword,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending,
    )
    
    papers = []
    
    # 执行搜索
    for result in client.results(search):
        paper = {
            "link": result.entry_id,
            "title": result.title,
            "publish_time": result.published.strftime("%Y%m%d"),
            "authors": [author.name for author in result.authors],
            "abstract": result.summary,
            "score": 1.0  # 由于是直接从 arXiv 获取，相关度设为 1
        }
        papers.append(paper)
    
    # 保存到文件
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'paper-agent-download.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(papers, f, ensure_ascii=False, indent=2)
    
    print(f"已获取 {len(papers)} 篇论文并保存到 {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("使用方法: python fetch_arxiv.py <关键字>")
        sys.exit(1)
    
    keyword = sys.argv[1]
    fetch_papers(keyword)