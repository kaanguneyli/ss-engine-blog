import React, {
  Children,
  cloneElement,
  HTMLProps,
  ReactElement,
  ReactNode,
} from "react";
import cx from "@/utils/cx";
import Button from "@/components/button";
import Icon, { ICON_NAMES } from "@/components/icon";
import { Product } from "@/utils/type";

export function ServerlessBox({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group/box-body relative z-0 grid gap-4 p-6 md:gap-8 md:p-8",
        "bg-white/5 backdrop-blur",
        "rounded-3xl md:rounded-[2.2rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ServerlessTitle({
  children,
  className,
  link,
}: HTMLProps<HTMLHeadElement> & {
  link?: string;
}) {
  return (
    <h4
      className={cx(
        "flex items-center gap-2 font-display text-xl font-semibold md:text-2xl",
        className
      )}
    >
      {children}
      {link && (
        <span
          className="inline-flex translate-y-1/4 text-emerald-300 opacity-0 transition
        group-hover/box-body:translate-y-0 group-hover/box-body:opacity-100"
        >
          <Button
            href={link}
            iconProps={{
              className: "text-3xl opacity-100",
            }}
          />
        </span>
      )}
    </h4>
  );
}

export function ServerlessSummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("mt-3 opacity-40", className)}>{children}</p>;
}

export function ProductFeature({
  children,
  className,
  product,
}: HTMLProps<HTMLUListElement> & {
  product?: Product;
}) {
  const childs: ReactNode[] = Children.map(
    // @ts-ignore
    children,
    (child: ReactElement) => {
      return cloneElement(child, {
        ...child.props,
        product,
      });
    }
  );

  return <ul className={cx("space-y-2", className)}>{childs}</ul>;
}

export function ProductFeatureItem({
  children,
  className,
  product,
}: HTMLProps<HTMLLIElement> & {
  product?: Product;
}) {
  return (
    <li
      className={cx(
        "flex",
        // product === Product.REDIS && "text-red-300",
        // product === Product.KAFKA && "text-blue-300",
        // product === Product.QSTASH && "text-purple-300",
        className
      )}
    >
      <Icon
        icon={ICON_NAMES.CircleCheck}
        className={cx("mr-2 text-2xl text-emerald-300")}
      />
      {children}
    </li>
  );
}
