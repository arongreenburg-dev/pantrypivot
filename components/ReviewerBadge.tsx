import React from 'react';
import { ToolReviewer } from '../affiliateCatalog';

const ReviewerBadge: React.FC<{ reviewer: ToolReviewer }> = ({ reviewer }) => {
  if (reviewer === 'ATK+CR') {
    return (
      <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
        🏆 CR + ATK Pick
      </span>
    );
  }
  if (reviewer === 'ATK') {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
        🏆 ATK Pick
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
      🏆 CR Pick
    </span>
  );
};

export default ReviewerBadge;
