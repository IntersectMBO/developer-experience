import React, { useEffect, type ReactNode } from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MeetupReminderButton from "@site/src/components/MeetupReminderButton";
import { DEVEX_SESSIONS_ENABLED } from "@site/src/components/MeetupReminderButton/constants";

export default function Root({ children }: { children: ReactNode }) {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // A new deploy, or a rebuild behind a running server, replaces the hashed
    // chunks. A tab left open across that boundary fails the next lazy route
    // load with ChunkLoadError and shows a dead error overlay. Reload once
    // instead, rate-limited so a genuinely missing chunk cannot loop.
    const KEY = "devex:chunk-reload";
    const isChunkError = (message: string) =>
      /ChunkLoadError|Loading (CSS )?chunk [\w.~-]+ failed/i.test(message);

    const reloadOnce = () => {
      try {
        const last = Number(window.sessionStorage.getItem(KEY) ?? 0);
        if (Date.now() - last < 15000) return;
        window.sessionStorage.setItem(KEY, String(Date.now()));
      } catch {
        // Session storage blocked: reloading blindly risks a loop.
        return;
      }
      window.location.reload();
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as Error | string | undefined;
      const message =
        typeof reason === "string" ? reason : reason?.message ?? String(reason ?? "");
      if (!isChunkError(message)) return;
      event.preventDefault();
      reloadOnce();
    };

    const onError = (event: ErrorEvent) => {
      if (isChunkError(event.message ?? "")) reloadOnce();
    };

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    // Minimal MutationObserver to fix any black text in search dropdown that CSS might miss
    const observer = new MutationObserver(() => {
      const darkTheme = document.documentElement.getAttribute("data-theme") === "dark";
      if (darkTheme) {
        const searchDropdowns = document.querySelectorAll(
          '.searchBar .dropdownMenu, .DocSearch-Modal, .DocSearch-Container'
        );
        searchDropdowns.forEach((dropdown) => {
          const allElements = dropdown.querySelectorAll("*");
          allElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              const computedStyle = window.getComputedStyle(el);
              // Only fix pure black text that CSS might have missed
              if (computedStyle.color === "rgb(0, 0, 0)" || computedStyle.color === "rgba(0, 0, 0, 1)") {
                el.style.setProperty("color", "rgba(255, 255, 255, 0.85)", "important");
              }
            }
          });
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.title} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IntersectMBO" />
        {/* No canonical link here on purpose. Docusaurus emits a per-page
            <link rel="canonical"> for every route from siteConfig.url, and a
            hard-coded one in Root — as this file used to have — replaces that
            with the site root, telling crawlers every page duplicates "/". */}
      </Head>
      {children}
      {DEVEX_SESSIONS_ENABLED ? <MeetupReminderButton /> : null}
    </>
  );
}
