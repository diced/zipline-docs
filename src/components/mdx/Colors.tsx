export default function Colors({
  colors,
}: {
  colors: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}) {
  if (!colors) {
    return null;
  }

  if (colors.length !== 10) {
    return null;
  }

  return (
    <div className='flex flex-row space-x-2 relative w-full px-10 my-2'>
      {colors.map((color, index) => (
        <div
          key={index}
          className='flex items-center grow justify-center px-6 py-4 rounded-md border-[1px] dark:border-gray-600 text-white'
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
