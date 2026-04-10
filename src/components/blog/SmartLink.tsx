import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  kind?: "editorial" | "sponsored";
};

const INTERNAL_HOSTS = new Set(["katmanlabs.com", "www.katmanlabs.com"]);

function isInternalHref(href: string) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return true;
  }

  try {
    const parsedUrl = new URL(href);
    return INTERNAL_HOSTS.has(parsedUrl.hostname);
  } catch {
    return false;
  }
}

function mergeRelTokens(rel: string | undefined, kind: SmartLinkProps["kind"]) {
  const tokens = new Set(
    (rel || "")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean),
  );

  tokens.add("noopener");
  tokens.add("noreferrer");

  if (kind === "sponsored" || tokens.has("sponsored")) {
    tokens.add("sponsored");
    tokens.add("nofollow");
  }

  return Array.from(tokens).join(" ");
}

export default function SmartLink({
  href = "",
  children,
  rel,
  target,
  kind = "editorial",
  ...rest
}: SmartLinkProps) {
  if (!href) {
    return <span {...rest}>{children}</span>;
  }

  if (isInternalHref(href)) {
    if (href.startsWith("#")) {
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      );
    }

    let to = href;

    try {
      if (href.startsWith("http://") || href.startsWith("https://")) {
        const parsedUrl = new URL(href);
        to = `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
    } catch {
      to = href;
    }

    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target || "_blank"}
      rel={mergeRelTokens(rel, kind)}
      {...rest}
    >
      {children}
    </a>
  );
}
