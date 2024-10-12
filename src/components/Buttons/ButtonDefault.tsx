"use client";
import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link?: string | null;
  mode?: "link" | "button";
  type?: "button" | "submit" | "reset" | undefined;
  customClasses?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  title?: string;
  ariaLabel?: string;
}

const ButtonDefault = ({
  label,
  link = undefined,
  mode = "button",
  type = "button",
  customClasses = "",
  size = "md",
  variant = "primary",
  disabled = false,
  onClick = () => {},
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  target = "_self",
  rel = "",
  title,
  ariaLabel,
}: ButtonPropTypes) => {
  return (
    <>
      {mode === "link" ? (
        <Link
          className={`${customClasses} ${
            size === "sm" ? "text-xs" : size === "md" ? "text-base" : "text-lg"
          } ${
            variant === "primary"
              ? "bg-primary-500 text-white hover:bg-opacity-80"
              : variant === "secondary"
                ? "bg-secondary-500 text-white hover:bg-opacity-80"
                : variant === "outline"
                  ? "border border-stroke-dark bg-white text-dark hover:bg-gray-100"
                  : "bg-transparent text-black hover:bg-opacity-80"
          } ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } flex items-center justify-center gap-2.5 text-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            fullWidth && "w-full"
          }`}
          href={link || "#"}
          onClick={() => {
            if (!loading) {
              onClick();
            }
          }}
          target={target}
          rel={rel}
          title={title}
          aria-label={ariaLabel}
        >
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {label}
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </Link>
      ) : (
        !loading && (
          <button
            type={type}
            className={`${customClasses} ${
              size === "sm"
                ? "text-xs"
                : size === "md"
                  ? "text-base"
                  : "text-lg"
            } ${
              variant === "primary"
                ? "bg-primary text-white "
                : variant === "secondary"
                  ? "bg-green text-white"
                  : variant === "outline"
                    ? "border border-stroke-dark px-3 py-3 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    : "bg-transparent text-black"
            } ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } flex max-h-[50px] w-full min-w-[130px] items-center justify-center  gap-2.5 rounded-md py-3 text-center font-medium transition-colors duration-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              fullWidth ? "!w-full" : "!max-w-[130px]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled) {
                onClick();
              }
            }}
            disabled={disabled}
            title={title}
            aria-label={ariaLabel}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {children}
            {label}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </button>
        )
      )}
    </>
  );
};

export default ButtonDefault;
