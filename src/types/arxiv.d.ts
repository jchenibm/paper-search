declare module 'arxiv' {
  export class Client {
    results(search: Search): AsyncIterableIterator<Result>;
  }

  export class Search {
    constructor(options: {
      query: string;
      maxResults?: number;
      sortBy?: 'submittedDate' | 'lastUpdatedDate' | 'relevance';
      sortOrder?: 'ascending' | 'descending';
    });
  }

  export interface Result {
    entry_id: string;
    title: string;
    published: {
      strftime(format: string): string;
    };
    authors: Array<{ name: string }>;
    summary: string;
  }

  export enum SortCriterion {
    SubmittedDate = 'submittedDate',
    LastUpdatedDate = 'lastUpdatedDate',
    Relevance = 'relevance'
  }

  export enum SortOrder {
    Ascending = 'ascending',
    Descending = 'descending'
  }
}