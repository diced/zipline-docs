export default function Image({
  title,
  alt,
  src,
}: {
  title?: string;
  alt?: string;
  src: string;
}) {
  if (title !== undefined) {
    return (
      <figure>
        <img src={src} alt={alt} className='rounded-md' />
        <figcaption>{title}</figcaption>
      </figure>
    );
  } else {
    return <img src={src} alt={alt} className='rounded-md' />;
  }
}
