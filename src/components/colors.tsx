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
    <div className='flex flex-row space-x-2 relative w-full my-2 mb-8'>
      {colors.map((color, index) => (
        <div
          key={index}
          className='flex items-center grow justify-center aspect-square rounded-md shadow-inner text-white'
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
