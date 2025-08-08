import * as React from "react";
import { X } from "lucide-react";

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

export function Chip({ label, onDelete }: ChipProps) {
  return (
    <div
      className="flex items-center gap-1 bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded select-none"
    >
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="p-0.5 rounded-full hover:bg-gray-300"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
