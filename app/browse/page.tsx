import { getClient } from '@/lib/apollo/client';
import { GET_ALL_BOOKS } from '@/lib/apollo/queries';
import BrowseContent from '@/components/browse/BrowseContent';

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
}

export interface Division {
  title: string;
  titleKr: string;
  books: Book[];
}

export interface Testament {
  title: string;
  titleKr: string;
  divisions: Division[];
  books: Book[];
}

export default async function BrowsePage() {
  const client = getClient();

  const { data } = await client.query<{
    testaments: Array<{
      title: string;
      titleKr: string;
      divisions: Array<{
        title: string;
        titleKr: string;
        books: Array<{
          slug: string;
          title: string;
          bookNameKr: string;
          shortName: string;
          shortNameKr: string;
          bookOrder: number;
          division: {
            title: string;
            titleKr: string;
          } | null;
          chaptersConnection: {
            totalCount: number;
          };
        }>;
      }>;
      books: Array<{
        slug: string;
        title: string;
        bookNameKr: string;
        shortName: string;
        shortNameKr: string;
        bookOrder: number;
        division: {
          title: string;
          titleKr: string;
        } | null;
        chaptersConnection: {
          totalCount: number;
        };
      }>;
    }>;
  }>({
    query: GET_ALL_BOOKS,
  });

  // Transform the data to match our Book interface
  const testaments: Testament[] = (data?.testaments || []).map(testament => ({
    title: testament.title,
    titleKr: testament.titleKr,
    divisions: testament.divisions
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(division => ({
        title: division.title,
        titleKr: division.titleKr,
        books: division.books
          .sort((a, b) => a.bookOrder - b.bookOrder)
          .map(book => ({
            slug: book.slug,
            title: book.title,
            bookNameKr: book.bookNameKr,
            shortName: book.shortName,
            shortNameKr: book.shortNameKr,
            bookOrder: book.bookOrder,
            divisionTitle: book.division?.title || division.title,
            divisionTitleKr: book.division?.titleKr || division.titleKr,
            chaptersCount: book.chaptersConnection.totalCount,
          })),
      })),
    books: testament.books
      .sort((a, b) => a.bookOrder - b.bookOrder)
      .map(book => ({
        slug: book.slug,
        title: book.title,
        bookNameKr: book.bookNameKr,
        shortName: book.shortName,
        shortNameKr: book.shortNameKr,
        bookOrder: book.bookOrder,
        divisionTitle: book.division?.title || '',
        divisionTitleKr: book.division?.titleKr || '',
        chaptersCount: book.chaptersConnection.totalCount,
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
