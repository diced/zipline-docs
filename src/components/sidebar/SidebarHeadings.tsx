import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Heading {
  title: string;
  id: string;
  level: number;
  visible: boolean;
  code?: boolean;
}

interface Headings {
  [id: string]: Heading;
}

export default function Headings({ close }: { close: () => void }) {
  const router = useRouter();
  const [headings, setHeadings] = useState<Headings>({});

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'));

    setHeadings({});

    const observers = elements.map((element) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHeadings((prev) => {
              const newHeadings = { ...prev };

              Object.keys(newHeadings).forEach((key) => {
                newHeadings[key].visible = newHeadings[key].id === element.id;
              });

              return newHeadings;
            });
          }
        },
        {
          rootMargin: '-100px 0% -66%',
          threshold: 1,
        },
      );

      observer.observe(element);

      setHeadings((prev) => ({
        ...prev,
        [element.id]: {
          title: element.textContent ?? '',
          id: element.id,
          level: Number(element.tagName[1]),
          visible: false,
          ...(element.innerHTML.startsWith('<code>') && { code: true }),
        },
      }));

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [router.asPath]);

  const headingToPadding = (level: number) => {
    return (
      {
        2: 'pl-0',
        3: 'pl-4',
        4: 'pl-8',
      }[level] ?? 'pl-0'
    );
  };

  const onHeadingClick = (e: any, id: string) => {
    e.preventDefault();

    const element = document.getElementById(id);
    if (element) {
      close();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <div className='flex flex-col space-y-2 mr-1 mb-4'>
      {Object.values(headings).map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={clsx(
            headingToPadding(heading.level),
            heading.visible ? 'text-blue-500' : 'text-gray-500',
            'hover:text-gray-800 dark:hover:text-gray-300 transition-all ease-in-out',
          )}
          onClick={(e) => onHeadingClick(e, heading.id)}
        >
          {heading.code ? (
            <code
              className={clsx(
                'rounded-md px-1 font-normal bg-gray-100 dark:bg-gray-800 transition-all ease-in-out',
                'hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                heading.visible
                  ? 'text-blue-500'
                  : 'text-black dark:text-white',
              )}
            >
              {heading.title}
            </code>
          ) : (
            heading.title
          )}
        </a>
      ))}
    </div>
  );
}
