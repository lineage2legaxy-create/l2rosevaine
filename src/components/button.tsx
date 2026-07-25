import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  containerClass?: string;
}

export const Button = ({
  id,
  children,
  className,
  containerClass,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = "button",
  ...buttonProps
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...buttonProps}
      id={id}
      type={type}
      className={cn(
        "button-chronicle group relative z-10 inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden px-7 py-3 font-sans text-xs font-bold tracking-[0.06em] whitespace-nowrap uppercase disabled:cursor-not-allowed disabled:opacity-50",
        containerClass,
        className
      )}
    >
      {LeftIcon ? <LeftIcon aria-hidden="true" focusable="false" /> : null}

      <span className="relative inline-flex overflow-hidden">{children}</span>

      {RightIcon ? <RightIcon aria-hidden="true" focusable="false" /> : null}
    </button>
  );
};
