import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const languages = [
  { code: "KOR", label: "한국어" },
  { code: "ENG", label: "English" },
/*   { code: "JPN", label: "日本語" },
  { code: "CHN", label: "中文" },
  { code: "VNM", label: "Tiếng Việt" },
  { code: "THA", label: "ไทย" },
  { code: "RUS", label: "Русский" },
  { code: "SPA", label: "Español" },
  { code: "FRA", label: "Français" },
  { code: "DEU", label: "Deutsch" },
  { code: "PHI", label: "Filipino" },
  { code: "IDN", label: "Bahasa Indonesia" },
  { code: "MAL", label: "Bahasa Melayu" }, */
];

export default function Home() {
  const [lang, setLang] = useState("KOR");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    setIsOpen(false);
  };

  const fullImage = `/images/banner_${lang}.jpg`; // 국가별 배너 이미지
  const buttonImage = `/images/button_${lang}.png`; // 국가별 버튼 이미지

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className={styles.container}>
      {/* 언어 선택 버튼 */}
        <header className={styles.header}>
          <div className={styles.languageSelector} ref={dropdownRef}>
              <span className={styles.currentLang}>
              {languages.find(l => l.code === lang)?.label}
            </span>
            <img
              src="/images/lang-icon.png"
              alt="언어 선택"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <ul className={styles.dropdownMenu}>
                {languages.map((langItem) => (
                  <li
                    key={langItem.code}
                    onClick={() => handleLanguageChange(langItem.code)}
                  >
                    {langItem.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

      {/* 국가별 메인 이미지 */}
      <section className={styles.topBanner}>
        <div className={styles.fullImage}>
          <Image
            src={fullImage}
            alt="메인 이미지"
            width={1080}
            height={1920}
            layout="responsive"
            priority
          />
        </div>

        {/* 쿠폰 아래 버튼 */}
        <a
          href="https://m.shinhan.com/mw/fin/pg/FS0100S0000F01?mid=211000100100"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.buttonImage} ${styles.middleButton}`}
        >
          <Image
            src={buttonImage}
            alt="신한은행 통장/체크카드 만들기"
            width={600}
            height={150}
            className={styles.buttonImg}
          />
        </a>

        {/* 배너 하단 버튼 */}
        <div className={styles.buttonWrapper}>
          <a
            href="https://m.shinhan.com/mw/fin/pg/FS0100S0000F01?mid=211000100100"
            target="_blank"
            rel="noopener noreferrer"
             className={styles.bottomButton}
          >
            <Image
              src={buttonImage}
              alt="신한은행 통장/체크카드 만들기"
              width={600}
              height={150}
              className={styles.buttonImg}
            />
          </a>
        </div>
      </section>
    </main>
  );
}
