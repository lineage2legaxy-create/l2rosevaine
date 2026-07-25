import type { PropsWithChildren } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface ButtonProps {
  id?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  containerClass?: string;
}

export const Button = ({
  id,
  children,
  containerClass,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      id={id}
      className={cn(
        "group relative z-10 flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-[999px] bg-amethyst px-7 py-3 text-obsidian transition-transform duration-150 ease-out active:scale-[0.97]",
        containerClass
      )}
    >
      {LeftIcon ? <LeftIcon /> : null}

      <p className="font-sans relative inline-flex overflow-hidden text-xs font-semibold tracking-[0.04em] whitespace-nowrap uppercase">
        {children}
      </p>

      {RightIcon ? <RightIcon /> : null}
    </button>
  );
};
