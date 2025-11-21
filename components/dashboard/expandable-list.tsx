'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ExpandableListProps {
  title?: string;
  items: React.ReactNode[];
  initialCount?: number;
  className?: string;
  emptyText?: string;
}

export function ExpandableList({ title, items, initialCount = 3, className, emptyText = "No items found." }: ExpandableListProps) {
  const [ isHovered, setIsHovered ] = useState(false);
  const [ height, setHeight ] = useState<number | 'auto'>('auto');
  const containerRef = useRef<HTMLDivElement>(null);

  const displayedItems = isHovered ? items : items.slice(0, initialCount);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHeight('auto');
  };

  return (
    <div
      className="relative"
      style={{ height: height }}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={ cn(`p-4 bg-card text-card-foreground rounded-lg shadow-sm transition-all duration-300 border border-transparent`, className, isHovered ? 'absolute top-0 left-0 right-0 z-10 border border-primary/20 shadow-md' : '') }>
        { title && <h2 className="mb-4 text-lg font-semibold">{ title }</h2> }
        { items.length > 0 ? (
          <ul className="space-y-3">
            { displayedItems.map((item, index) => (
              <li key={ index } className="text-sm">
                { item }
              </li>
            )) }
          </ul>
        ) : (
            <p className="text-sm text-muted-foreground">{ emptyText }</p>
        ) }

        { !isHovered && items.length > initialCount && (
          <div className="pt-3 text-xs text-center text-muted-foreground bg-gradient-to-t from-background to-transparent">
            +{ items.length - initialCount } more...
          </div>
        ) }
      </div>
    </div>
  );
}
