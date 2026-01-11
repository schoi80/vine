import { describe, it, expect } from 'vitest';
import { getTranslation, getLocalizedBookName } from './bilingual';
import { Translatable } from '@/lib/types/hierarchy';

describe('bilingual utilities', () => {
  describe('getTranslation', () => {
    // ... existing tests ...
    it('returns the English fallback when language is en', () => {
      const item: Translatable = {
        translations: [{ language: 'ko', field: 'title', text: '테스트' }],
      };
      expect(getTranslation(item, 'title', 'en', 'Test')).toBe('Test');
    });

    it('returns the Korean translation when language is ko', () => {
      const item: Translatable = {
        translations: [{ language: 'ko', field: 'title', text: '테스트' }],
      };
      expect(getTranslation(item, 'title', 'ko', 'Test')).toBe('테스트');
    });
  });

  describe('getLocalizedBookName', () => {
    it('finds book translation correctly', () => {
      const book = {
        title: 'Genesis',
        translations: [{ language: 'ko', field: 'title', text: '창세기' }],
      };
      // Note: This expects 'title' field in translation to match 'bookName' request?
      // WAIT: getLocalizedBookName calls getTranslation(book, 'bookName', ...)
      // But the translation field might be 'title'.
      expect(getLocalizedBookName(book, 'ko')).toBe('창세기');
    });

    it('finds bookName translation correctly', () => {
      const book = {
        title: 'Genesis',
        translations: [{ language: 'ko', field: 'bookName', text: '창세기' }],
      };
      expect(getLocalizedBookName(book, 'ko')).toBe('창세기');
    });
  });
});
