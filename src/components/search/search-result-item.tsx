'use client';

import { SearchDialogListItem, type SearchItemType } from 'fumadocs-ui/components/dialog/search';
import { SearchMethodBadge } from './method-badge';
import { SearchMarkdown } from './search-markdown';

type SearchResult = SearchItemType & { method?: string };

export function SearchResultItem({ item, onClick }: { item: SearchItemType; onClick: () => void }) {
  const method = (item as SearchResult).method;

  if (item.type === 'action' || !method || typeof item.content !== 'string') {
    return <SearchDialogListItem item={item} onClick={onClick} />;
  }

  return (
    <SearchDialogListItem
      item={item}
      onClick={onClick}
      renderMarkdown={(content) => (
        <span className='inline-flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1'>
          <span className='inline-flex shrink-0 items-center gap-1.5 text-xs text-fd-muted-foreground'>
            method:
            <SearchMethodBadge method={method} />
          </span>
          <SearchMarkdown>{content}</SearchMarkdown>
        </span>
      )}
    />
  );
}
