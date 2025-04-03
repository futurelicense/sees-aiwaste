declare module 'papaparse' {
  export interface ParseResult<T> {
    data: T[];
    errors: Array<{
      type: string;
      code: string;
      message: string;
      row?: number;
    }>;
    meta: {
      delimiter: string;
      linebreak: string;
      aborted: boolean;
      truncated: boolean;
      cursor: number;
      fields?: string[];
    };
  }
  export interface ParseConfig<T> {
    delimiter?: string;
    newline?: string;
    quoteChar?: string;
    escapeChar?: string;
    header?: boolean;
    transformHeader?: (header: string) => string;
    dynamicTyping?: boolean | {
      [headerName: string]: boolean;
    };
    preview?: number;
    encoding?: string;
    worker?: boolean;
    comments?: boolean | string;
    download?: boolean;
    skipEmptyLines?: boolean | 'greedy';
    fastMode?: boolean;
    withCredentials?: boolean;
    delimitersToGuess?: string[];
    complete?: (results: ParseResult<T>) => void;
    error?: (error: Error) => void;
    transform?: (value: string, field: string | number) => string | number;
  }
  export function parse<T>(file: File, config: ParseConfig<T>): void;
}