import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
}

export function FilterChip({ label, selected = false, onToggle }: FilterChipProps) {
  const [isSelected, setIsSelected] = useState(selected);

  const handleToggle = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onToggle?.(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded border text-sm transition-all",
        isSelected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {label}
      {isSelected && (
        <X
          className="h-4 w-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsSelected(false);
            onToggle?.(false);
          }}
        />
      )}
    </button>
  );
}
