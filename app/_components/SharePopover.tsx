"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Copy } from "@/data/copy";

type ShareLabels = Copy["mobileMvp"]["share"];

type SharePopoverProps = {
  open: boolean;
  url: string;
  labels: ShareLabels;
  onClose: () => void;
  buttonPos?: { top: number; left: number; right: number } | null;
};

type NetworkKey = "x" | "facebook" | "linkedin" | "whatsapp" | "telegram";

const POPOVER_GAP = 8;

/**
 * Share sheet rendered INSIDE the phone screen (so the screen's `overflow:
 * hidden` keeps it within the device, preserving the MVP mockup). It slides up
 * from the bottom like a native iOS/Android share sheet. It is opened by the
 * phone (PhoneEmulator) when the existing in-app "Compartilhar perfil" button
 * is pressed.
 */
export default function SharePopover({
  open,
  url,
  labels,
  onClose,
  buttonPos,
}: SharePopoverProps) {
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(labels.text);

  const networks: Array<{
    key: NetworkKey;
    label: string;
    href: string;
    icon: ReactNode;
  }> = [
    {
      key: "x",
      label: labels.networks.x,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: <XIcon />,
    },
    {
      key: "facebook",
      label: labels.networks.facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
    {
      key: "linkedin",
      label: labels.networks.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
    },
    {
      key: "whatsapp",
      label: labels.networks.whatsapp,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: <WhatsAppIcon />,
    },
    {
      key: "telegram",
      label: labels.networks.telegram,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: <TelegramIcon />,
    },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: globalThis.MouseEvent) => {
      if (popoverRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    const onScrollOrResize = () => onClose();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  if (!open) return null;

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — keep the link visible to copy manually */
    }
  };

  return (
    <div className="phone-share__overlay is-open">
      <div
        className="phone-share__scrim"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={popoverRef}
        className={
          copied ? "phone-share__popover is-copied" : "phone-share__popover"
        }
        role="dialog"
        aria-modal="true"
        aria-label={labels.title}
        style={{
          position: "absolute",
          top: buttonPos ? `${buttonPos.top + POPOVER_GAP}px` : "auto",
          left: buttonPos ? "auto" : "50%",
          right: buttonPos ? `${buttonPos.right}px` : "auto",
          bottom: buttonPos ? "auto" : "1rem",
          transform: buttonPos ? "none" : "translateX(-50%)",
          zIndex: 10000,
        }}
      >
        <span className="phone-share__grabber" aria-hidden="true" />
        <p className="phone-share__title">{labels.title}</p>
        <ul className="phone-share__networks">
          {networks.map((n) => (
            <li key={n.key}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`phone-share__network phone-share__network--${n.key}`}
                onClick={onClose}
              >
                <span className="phone-share__icon" aria-hidden="true">
                  {n.icon}
                </span>
                <span className="phone-share__name">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="phone-share__copy"
          onClick={copyLink}
        >
          <LinkIcon />
          <span>{copied ? labels.copied : labels.copy}</span>
        </button>
        {copied ? (
          <span className="phone-share__url" aria-live="polite">
            {url}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* --- icons (inline, single-color) --- */

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 15l6-6M10.5 6.5l1-1a4 4 0 015.7 5.7l-2 2M13.5 17.5l-1 1a4 4 0 01-5.7-5.7l2-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.5 3h3l-7.1 8.1L22 21h-6.4l-5-6.5L4.8 21H1.8l7.6-8.7L2 3h6.6l4.5 6 4.4-6zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5A2.5 2.5 0 105 8.5a2.5 2.5 0 00-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.6 4.75 6V21H17.6v-5.5c0-1.3 0-3-1.85-3s-2.15 1.4-2.15 2.9V21H9z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.9 12.6l-.2.3.8 2.9-3-.8-.3.2A8.2 8.2 0 1112 3.8zm-3.2 4c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.2.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.1-1.3l-.8-.4-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.7-2.3-1.6-.6-.6-1-1.3-1.2-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5l-.7-1.7c-.2-.4-.3-.4-.5-.4z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.9 4.3l-3 14.1c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.5-.9.5l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.5 13 3 11.6c-1-.3-1-1 .2-1.5l17-6.6c.8-.3 1.5.2 1.7 1.8z"
      />
    </svg>
  );
}
