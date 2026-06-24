import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface Language {
  code: string;
  label: string;
  path: string;
}

interface LanguageSwitcherProps {
  current: string;
  languages: Language[];
}

export default function LanguageSwitcher({
  current,
  languages,
}: LanguageSwitcherProps) {
  return (
    <div className={styles.switcher}>
      <span className={styles.label}>Read in:</span>
      {languages.map((lang) =>
        lang.code === current ? (
          <span key={lang.code} className={`${styles.button} ${styles.active}`}>
            {lang.label}
          </span>
        ) : (
          <Link key={lang.code} to={lang.path} className={styles.button}>
            {lang.label}
          </Link>
        )
      )}
    </div>
  );
}
