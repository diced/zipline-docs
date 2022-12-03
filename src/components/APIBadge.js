import clsx from "clsx";
import React from "react";

export default function APIBadge({ type }) {
  return <span className={clsx("badge", `color-${type}`)}>{type}</span>;
}
