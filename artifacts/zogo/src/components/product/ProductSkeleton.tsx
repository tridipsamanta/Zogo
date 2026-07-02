import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative pt-[100%] w-full bg-muted">
        {/* Optional icon placeholder */}
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Meta Row */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-muted rounded"></div>
          <div className="h-3 w-12 bg-muted rounded"></div>
        </div>

        {/* Title Rows */}
        <div className="space-y-2 mt-1">
          <div className="h-5 w-full bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
        </div>

        {/* Price Row */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="space-y-1">
            <div className="h-3 w-10 bg-muted rounded"></div>
            <div className="h-6 w-16 bg-muted/80 rounded"></div>
          </div>
          <div className="h-9 w-9 bg-muted rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
