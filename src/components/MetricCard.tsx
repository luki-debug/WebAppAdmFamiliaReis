import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  trend?: string;
}

export function MetricCard({ title, value, subtitle, icon: Icon, iconColor, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
          {trend && (
            <p className="text-green-600 text-xs font-medium mt-2">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}