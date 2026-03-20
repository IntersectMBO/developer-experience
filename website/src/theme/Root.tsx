import React, { useEffect } from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import MeetupReminderButton from "@site/src/components/MeetupReminderButton";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url;

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
        <link rel="canonical" href={siteUrl} />
      </Head>
      {children}
      <MeetupReminderButton />
    </>
  );
}