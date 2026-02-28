import React from "react";

/* -------------------------------------------------------------------------- */
/*                              Settings Section                              */
/* -------------------------------------------------------------------------- */

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <div className="bg-[#151619] border border-[#1A1B1E] rounded-xl p-6 mb-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Action Button                                */
/* -------------------------------------------------------------------------- */

interface ActionBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const ActionBtn = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ActionBtnProps) => {
  const baseStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors";

  const variantStyle =
    variant === "primary"
      ? "bg-emerald-500 text-black hover:bg-emerald-400"
      : variant === "secondary"
      ? "bg-[#1A1B1E] text-white border border-[#2A2B2E] hover:bg-[#2A2B2E]"
      : "bg-red-500 text-white hover:bg-red-400";

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Toggle Switch                               */
/* -------------------------------------------------------------------------- */

interface ToggleSwitchProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleSwitch = ({
  label,
  description,
  enabled,
  onChange,
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-zinc-500 mt-0.5">
            {description}
          </div>
        )}
      </div>

      <button
        onClick={() => onChange(!enabled)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
          enabled ? "bg-emerald-500" : "bg-[#2A2B2E]"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Pill Selector                                */
/* -------------------------------------------------------------------------- */

interface PillSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const PillSelector = ({
  options,
  selected,
  onChange,
}: PillSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === selected;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              isActive
                ? "bg-[#1A1B1E] text-white border border-[#2A2B2E]"
                : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Styled Input                                 */
/* -------------------------------------------------------------------------- */

interface StyledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightElement?: React.ReactNode;
}

export const StyledInput = ({
  label,
  rightElement,
  className = "",
  ...props
}: StyledInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white">
        {label}
      </label>

      <div className="relative">
        <input
          className={`w-full bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
