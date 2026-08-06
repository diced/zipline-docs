import { buttonVariants } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function OpenAPIDownloadButton() {
  return (
    <a
      href='/openapi.json'
      download='zipline-openapi.json'
      className={buttonVariants({
        color: 'primary',
        className: 'not-prose gap-2',
      })}
    >
      <Download aria-hidden='true' className='size-4' />
      Download OpenAPI JSON
    </a>
  );
}
