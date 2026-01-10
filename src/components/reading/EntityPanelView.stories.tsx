import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EntityPanelView } from './EntityPanelView';
import { ChipList } from '@/components/ui/ChipList';

const meta: Meta<typeof EntityPanelView> = {
  title: 'Reading/EntityPanelView',
  component: EntityPanelView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EntityPanelView>;

const sampleContent = (
  <div className="space-y-6">
    <div>
      <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-2 text-sm font-semibold uppercase">
        Key Information
      </h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-neutral-10 dark:text-neutral-dark-10">Gender:</span>{' '}
          <span className="text-neutral-12 dark:text-neutral-dark-12">Male</span>
        </div>
        <div>
          <span className="text-neutral-10 dark:text-neutral-dark-10">Title:</span>{' '}
          <span className="text-neutral-12 dark:text-neutral-dark-12">Prophet</span>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
        Related People
      </h3>
      <ChipList
        items={[
          { id: 'abraham', label: 'Abraham', color: 'person' },
          { id: 'isaac', label: 'Isaac', color: 'person' },
          { id: 'jacob', label: 'Jacob', color: 'person' },
        ]}
        interactive
      />
    </div>

    <div>
      <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
        Related Places
      </h3>
      <ChipList
        items={[
          { id: 'canaan', label: 'Canaan', color: 'place' },
          { id: 'egypt', label: 'Egypt', color: 'place' },
        ]}
        interactive
      />
    </div>
  </div>
);

export const PersonPanel: Story = {
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'Moses',
    summary:
      'Moses was a prophet and leader who led the Israelites out of Egyptian slavery and received the Ten Commandments from God on Mount Sinai.',
    closeLabel: 'Close',
    children: sampleContent,
  },
};

export const PlacePanel: Story = {
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'place',
    entityName: 'Jerusalem',
    summary:
      'Jerusalem is a city in the Middle East, located in the Judean Mountains between the Mediterranean and the Dead Sea. It is considered holy by Jews, Christians, and Muslims.',
    closeLabel: 'Close',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Key Events
          </h3>
          <ChipList
            items={[
              { id: 'temple-dedication', label: 'Temple Dedication', color: 'event' },
              { id: 'exile', label: 'Babylonian Exile', color: 'event' },
            ]}
            interactive
          />
        </div>
      </div>
    ),
  },
};

export const EventPanel: Story = {
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'event',
    entityName: 'The Exodus (1446 BC)',
    summary:
      'The Exodus was the departure of the Israelites from Egypt under the leadership of Moses. It is one of the most significant events in Jewish history.',
    closeLabel: 'Close',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Timeline
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-neutral-10 mb-2 text-sm font-medium">Before</h4>
              <ChipList
                items={[{ id: 'plagues', label: 'Ten Plagues', color: 'event' }]}
                interactive
              />
            </div>
            <div>
              <h4 className="text-neutral-10 mb-2 text-sm font-medium">After</h4>
              <ChipList
                items={[{ id: 'sinai', label: 'Covenant at Sinai', color: 'event' }]}
                interactive
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const Korean: Story = {
  args: {
    open: true,
    onClose: () => alert('닫기'),
    entityType: 'person',
    entityName: '모세',
    summary:
      '모세는 이스라엘 민족을 이집트의 노예 생활에서 이끌어내고 시나이 산에서 하나님으로부터 십계명을 받은 선지자이자 지도자입니다.',
    closeLabel: '닫기',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            관련 인물
          </h3>
          <ChipList
            items={[
              { id: 'aaron', label: '아론', color: 'person' },
              { id: 'miriam', label: '미리암', color: 'person' },
            ]}
            interactive
          />
        </div>
      </div>
    ),
  },
};

export const WithoutSummary: Story = {
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'place',
    entityName: 'Bethlehem',
    closeLabel: 'Close',
    children: sampleContent,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'David',
    closeLabel: 'Close',
    children: sampleContent,
  },
};

export const LongContent: Story = {
  args: {
    open: true,
    onClose: () => alert('Close clicked'),
    entityType: 'person',
    entityName: 'Abraham',
    summary:
      'Abraham (originally Abram) is the patriarch of the Israelite, Ishmaelite, Edomite, and Midianite peoples. He is revered as the father of monotheism in Judaism, Christianity, and Islam. According to the Book of Genesis, God called Abraham to leave his homeland and family to travel to Canaan, promising to make him the father of a great nation.',
    closeLabel: 'Close',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Family Relations
          </h3>
          <ChipList
            items={[
              { id: 'sarah', label: 'Sarah (Wife)', color: 'person' },
              { id: 'isaac', label: 'Isaac (Son)', color: 'person' },
              { id: 'ishmael', label: 'Ishmael (Son)', color: 'person' },
            ]}
            interactive
          />
        </div>

        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Key Events
          </h3>
          <ChipList
            items={[
              { id: 'covenant', label: 'Covenant with God', color: 'event' },
              { id: 'isaac-birth', label: 'Birth of Isaac', color: 'event' },
              { id: 'binding', label: 'Binding of Isaac', color: 'event' },
            ]}
            interactive
          />
        </div>

        <div>
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 mb-3 text-sm font-semibold uppercase">
            Related Places
          </h3>
          <ChipList
            items={[
              { id: 'ur', label: 'Ur of the Chaldeans', color: 'place' },
              { id: 'haran', label: 'Haran', color: 'place' },
              { id: 'canaan', label: 'Canaan', color: 'place' },
              { id: 'egypt', label: 'Egypt', color: 'place' },
              { id: 'hebron', label: 'Hebron', color: 'place' },
            ]}
            interactive
          />
        </div>
      </div>
    ),
  },
};
