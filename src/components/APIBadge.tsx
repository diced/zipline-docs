interface APIBadgeProps {
  type: string;
}

export default function APIBadge({ type }: APIBadgeProps) {
  return (
    <div className='inline-block font-bold text-center rounded-md mr-1'>
      <span className={`text-gray-700 bg-gray-200 color-${type} rounded-md text-white py-1/2 px-2`}>
        {type}
      </span>
    </div>
  );
}
