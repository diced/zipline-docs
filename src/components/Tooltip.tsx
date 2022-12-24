import { ReactNode, useState } from 'react';
import { useFloating, useInteractions, useHover, Placement } from '@floating-ui/react-dom-interactions';
import { motion } from 'framer-motion';

interface TooltipProps {
  label: string | ReactNode;
  children: ReactNode;
  placement: Placement;
}

export default function Tooltip({ children, label, placement }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useHover(context)]);

  return (
    <>
      <div className='inline-flex' ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <motion.div
        ref={floating}
        style={{
          position: strategy,
          left: x ?? 0,
          top: y ? y - 10 : 0,
        }}
        {...getFloatingProps()}
        animate={{ opacity: open ? 1 : 0 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='bg-gray-300 dark:bg-gray-800 p-1 rounded-md shadow-lg text-black dark:text-white'
      >
        {label}
      </motion.div>
    </>
  );
}
