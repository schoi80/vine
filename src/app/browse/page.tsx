import { getClient } from '@/lib/apollo/client';
import { GET_ALL_BOOKS } from '@/lib/apollo/queries';
import BrowseContent from '@/components/browse/BrowseContent';
import {
  getLocalizedBookName,
  getLocalizedTitle,
  getLocalizedShortName,
} from '@/lib/utils/bilingual';
import { Translation } from '@/lib/types/hierarchy';

export interface Book {
  slug: string;
  title: string;
  bookNameKr: string;
  shortName: string;
  shortNameKr: string;
  bookOrder: number;
  divisionTitle: string;
  divisionTitleKr: string;
  chaptersCount: number;
  translations?: Translation[];
}

export interface Division {
  title: string;
  titleKr: string;
  books: Book[];
  translations?: Translation[];
}

export interface Testament {
  title: string;
  titleKr: string;
  divisions: Division[];
  books: Book[];
  translations?: Translation[];
}

export default async function BrowsePage() {
  const client = getClient();

  const { data } = await client.query<any>({
    query: GET_ALL_BOOKS,
  });

  // Transform the data to match our Book interface
  const testaments: Testament[] = (data?.testaments || []).map((testament: any) => ({
    title: testament.title,
    titleKr: getLocalizedTitle(testament, 'ko'),
    translations: testament.translations,
    divisions: testament.divisions
      .sort((a: any, b: any) => a.title.localeCompare(b.title))
      .map((division: any) => ({
        title: division.title,
        titleKr: getLocalizedTitle(division, 'ko'),
        translations: division.translations,
        books: division.books
          .sort((a: any, b: any) => a.bookOrder - b.bookOrder)
          .map((book: any) => ({
            slug: book.slug,
            title: book.title,
            bookNameKr: getLocalizedBookName(book, 'ko'),
            shortName: book.shortName,
            shortNameKr: getLocalizedShortName(book, 'ko'),
            bookOrder: book.bookOrder,
            divisionTitle: book.division?.title || division.title,
            divisionTitleKr: getLocalizedTitle(book.division || division, 'ko'),
            chaptersCount: book.chaptersConnection.totalCount,
            translations: book.translations,
          })),
      })),
    books: testament.books
      .sort((a: any, b: any) => a.bookOrder - b.bookOrder)
      .map((book: any) => ({
        slug: book.slug,
        title: book.title,
        bookNameKr: getLocalizedBookName(book, 'ko'),
        shortName: book.shortName,
        shortNameKr: getLocalizedShortName(book, 'ko'),
        bookOrder: book.bookOrder,
        divisionTitle: book.division?.title || '',
        divisionTitleKr: getLocalizedTitle(book.division, 'ko'),
        chaptersCount: book.chaptersConnection.totalCount,
        translations: book.translations,
      })),
  }));

  return <BrowseContent testaments={testaments} />;
}

export async function generateMetadata() {
  return {
    title: 'Browse Books - in the vine',
    description: 'Explore all 66 books of the Bible organized by testament and division',
  };
}
