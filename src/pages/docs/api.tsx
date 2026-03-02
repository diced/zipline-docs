import Link from 'next/link';
import ApiDocs from '../../components/ApiDocs';
import ScrollToTop from '../../components/mdx/ScrollToTop';

export default function DocsPageApi() {
  return (
    <>
      <Link
        href='/docs/get-started'
        className='text-sm text-blue-500 hover:underline mx-5 inline-block'
      >
        &larr; Back to Docs
      </Link>

      <ScrollToTop />

      <div className='grow overflow-hidden relative px-8'>
        <ApiDocs />
      </div>
    </>
  );
}
