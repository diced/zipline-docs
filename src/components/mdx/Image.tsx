import { Dialog, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import NextImage from 'next/image';

export default function Image({
  title,
  alt,
  src,
  width,
  height,
}: {
  title?: string;
  alt?: string;
  src: string;
  width?: number;
  height?: number;
}) {
  const [open, setOpen] = useState(false);

  const local = !src.startsWith('http');

  const imageComponent =
    local && width && height ? (
      <NextImage
        src={src}
        alt={alt ?? src}
        width={width}
        height={height}
        className='rounded-md cursor-pointer my-0.5'
        onClick={() => setOpen(true)}
        loading='lazy'
      />
    ) : (
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className='rounded-md max-w-full h-auto cursor-pointer'
        onClick={() => setOpen(true)}
      />
    );

  return (
    <>
      {title ? (
        <figure>
          {imageComponent}

          <figcaption>{title}</figcaption>
        </figure>
      ) : (
        imageComponent
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 w-screen overflow-y-auto bg-black/75'>
          <div className='flex min-h-full items-center justify-center'>
            <DialogPanel
              transition
              className='w-full text-center items-center justify-center flex max-w-md rounded-md duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
            >
              <img
                src={src}
                alt={alt}
                loading='lazy'
                className='rounded-md max-w-[90vw] max-h-[90vh]'
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
