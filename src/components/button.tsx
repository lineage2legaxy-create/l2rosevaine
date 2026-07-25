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
      type="button"
      className={cn(
        "button-chronicle group focus-visible:outline-ivory relative z-10 inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden px-7 py-3 font-sans text-xs font-bold tracking-[0.06em] whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50",
        containerClass
      )}
    >
      {LeftIcon ? <LeftIcon aria-hidden="true" focusable="false" /> : null}

      <span className="relative inline-flex overflow-hidden">{children}</span>

      {RightIcon ? <RightIcon aria-hidden="true" focusable="false" /> : null}
    </button>
  );
};
