import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';
import { PageView } from '../types';

interface BreadcrumbItem {
  label: string;
  page?: PageView;
  villageId?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {isLast || !item.page ? (
                <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => navigateTo(item.page!, item.villageId)}
                  className="text-slate-600 hover:text-slate-900 transition-colors truncate max-w-[180px] sm:max-w-none"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
