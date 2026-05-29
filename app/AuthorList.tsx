"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Author = {
  name: string;
  affiliation: string;
  href?: string;
};

type TooltipState = {
  affiliation: string;
  anchorLeft: number;
  anchorTop: number;
};

export default function AuthorList({ authors }: { authors: Author[] }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!tooltip || !containerRef.current || !tooltipRef.current) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const left = Math.min(
      Math.max(0, tooltip.anchorLeft),
      Math.max(0, containerWidth - tooltipWidth)
    );

    setPosition({
      left,
      top: tooltip.anchorTop - tooltipHeight - 8
    });
  }, [tooltip]);

  const showTooltip = (affiliation: string, target: HTMLElement) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    setTooltip({
      affiliation,
      anchorLeft: target.offsetLeft,
      anchorTop: target.offsetTop
    });
  };

  return (
    <p className="authors" ref={containerRef}>
      {authors.map((author, index) => (
        <span className="authorItem" key={author.name}>
          {author.href ? (
            <a
              className="authorName"
              href={author.href}
              onBlur={() => setTooltip(null)}
              onFocus={(event) =>
                showTooltip(author.affiliation, event.currentTarget)
              }
              onMouseEnter={(event) =>
                showTooltip(author.affiliation, event.currentTarget)
              }
              onMouseLeave={() => setTooltip(null)}
            >
              {author.name}
            </a>
          ) : (
            <span
              className="authorName"
              onBlur={() => setTooltip(null)}
              onFocus={(event) =>
                showTooltip(author.affiliation, event.currentTarget)
              }
              onMouseEnter={(event) =>
                showTooltip(author.affiliation, event.currentTarget)
              }
              onMouseLeave={() => setTooltip(null)}
              tabIndex={0}
            >
              {author.name}
            </span>
          )}
          {index < authors.length - 1 ? " ·" : ""}
        </span>
      ))}
      {tooltip ? (
        <span
          className="authorTooltip"
          ref={tooltipRef}
          role="tooltip"
          style={{ left: position.left, top: position.top }}
        >
          {tooltip.affiliation}
        </span>
      ) : null}
    </p>
  );
}
