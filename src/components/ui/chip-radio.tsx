
type Option = {
  value: string;
  label: string;
};

type ChipRadioProps = {
  name?: string;
  options: Option[];
  value?: string; // selected value
  onChange?: (value: string) => void;
  className?: string;
  primaryColor?: string; // ex: "#D19F28"
};

function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export function ChipRadio({
  name,
  options,
  value,
  onChange,
  className,
  primaryColor = "#D19F28",
}: ChipRadioProps) {
  // keyboard navigation: left/right arrows
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
      return;

    e.preventDefault();
    const dir = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
    const nextIndex = (idx + dir + options.length) % options.length;
    const next = options[nextIndex];
    onChange?.(next.value);
    const el = document.querySelector<HTMLButtonElement>(
      `[data-chip="${name ?? ""}-${next.value}"]`
    );
    el?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={name ?? "chip-radio-group"}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt, idx) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            data-chip={`${name ?? ""}-${opt.value}`}
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e, idx)}
            onClick={() => onChange?.(opt.value)}
            type="button"
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors",
              selected
                ? "text-white"
                : "text-gray-800 bg-gray-100 hover:bg-gray-200",
              // border + shadow to emphasize clickable chip
              "border",
              selected ? "shadow-md" : "border-gray-200",
            )}
            // inline style to customize primary color
            style={
              selected
                ? {
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                  }
                : undefined
            }
          >
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
