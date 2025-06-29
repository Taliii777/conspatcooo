declare global {
  interface Intl {
    Segmenter: {
      new (locales?: string | string[], options?: { granularity?: 'character' | 'grapheme' | 'word' }): Segmenter;
    };
  }

  interface Segmenter {
    segment(text: string): Iterable<{ segment: string; index: number }>;
  }
}

export {};
