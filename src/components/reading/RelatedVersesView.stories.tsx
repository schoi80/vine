import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RelatedVersesView } from './RelatedVersesView';

const meta: Meta<typeof RelatedVersesView> = {
  title: 'Reading/RelatedVersesView',
  component: RelatedVersesView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RelatedVersesView>;

const sampleVersesEnglish = [
  {
    book: 'Genesis',
    chapter: 1,
    verse: 1,
    text: 'In the beginning [God] created the heavens and the earth.',
  },
  {
    book: 'Genesis',
    chapter: 1,
    verse: 2,
    text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of [God] was hovering over the waters.',
  },
  {
    book: 'Genesis',
    chapter: 1,
    verse: 3,
    text: 'And [God] said, "Let there be light," and there was light.',
  },
  {
    book: 'John',
    chapter: 1,
    verse: 1,
    text: 'In the beginning was the Word, and the Word was with [God], and the Word was [God].',
  },
  {
    book: 'John',
    chapter: 1,
    verse: 3,
    text: 'Through him all things were made; without him nothing was made that has been made.',
  },
];

const sampleVersesKorean = [
  {
    book: '창세기',
    chapter: 1,
    verse: 1,
    text: '태초에 [하나님]이 천지를 창조하시니라',
  },
  {
    book: '창세기',
    chapter: 1,
    verse: 2,
    text: '땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 [하나님]의 영은 수면 위에 운행하시니라',
  },
  {
    book: '창세기',
    chapter: 1,
    verse: 3,
    text: '[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고',
  },
  {
    book: '요한복음',
    chapter: 1,
    verse: 1,
    text: '태초에 말씀이 계시니라 이 말씀이 [하나님]과 함께 계셨으니 이 말씀은 곧 [하나님]이시니라',
  },
];

export const Default: Story = {
  args: {
    verses: sampleVersesEnglish.slice(0, 3),
    totalCount: 5,
    hasMore: true,
    onShowMore: () => alert('Show more clicked'),
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...',
    useKoreanFonts: false,
  },
};

export const Korean: Story = {
  args: {
    verses: sampleVersesKorean,
    totalCount: 4,
    hasMore: false,
    onShowMore: () => alert('더 보기 clicked'),
    title: '관련 구절',
    showMoreLabel: '더 보기',
    loadingLabel: '로딩 중...',
    useKoreanFonts: true,
  },
};

export const Loading: Story = {
  args: {
    verses: [],
    totalCount: 0,
    hasMore: false,
    onShowMore: () => {},
    loading: true,
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading verses...',
  },
};

export const Error: Story = {
  args: {
    verses: [],
    totalCount: 0,
    hasMore: false,
    onShowMore: () => {},
    error: 'Failed to load verses: Network error',
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...',
  },
};

export const AllLoaded: Story = {
  args: {
    verses: sampleVersesEnglish,
    totalCount: 5,
    hasMore: false,
    onShowMore: () => {},
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...',
  },
};

export const LargeDataset: Story = {
  args: {
    verses: [
      ...sampleVersesEnglish,
      {
        book: 'Revelation',
        chapter: 21,
        verse: 1,
        text: 'Then I saw "a new heaven and a new earth," for the first heaven and the first earth had passed away, and there was no longer any sea.',
      },
      {
        book: 'Revelation',
        chapter: 21,
        verse: 3,
        text: 'And I heard a loud voice from the throne saying, "Look! [God]\'s dwelling place is now among the people, and he will dwell with them."',
      },
    ],
    totalCount: 127,
    hasMore: true,
    onShowMore: () => alert('Show more clicked'),
    title: 'Related Verses',
    showMoreLabel: 'Show More',
    loadingLabel: 'Loading...',
  },
};
