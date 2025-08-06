import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const languages = [
  { code: "KOR", label: "한국어" },
  { code: "ENG", label: "English" },
/*{ code: "JPN", label: "日本語" },
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

// 인앱에서 열기
const openExternalLink = (url) => {
  try {
    // 1. 현재 창에서 이동
    window.location.href = url;
      setTimeout(() => {
      const ua = navigator.userAgent.toLowerCase();

      // Android: Chrome 강제 실행 (intent)
      if (ua.includes("android")) {
        const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;
      }
      // iOS: Universal Link (그냥 HTTPS → 사파리 실행)
      else if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href = url; // iOS는 그냥 다시 시도
      }
    }, 500);
  } catch (e) {
    // 2. 혹시 막히면 fallback
    window.open(url, "_self");
  }
};

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
  const bankLink = "https://m.shinhan.com/mw/fin/pg/FS0100S0000F01?mid=211000100100";

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
          <div className={styles.languageSelector} ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
            <span className={styles.currentLang}>
              {languages.find(l => l.code === lang)?.label}
            </span>
            <img
              src="/images/lang-icon.png"
              alt="언어 선택"
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
        <div
          onClick={() => openExternalLink(bankLink)}
          className={`${styles.buttonImage} ${styles.middleButton}`}
        >
          <Image
            src={buttonImage}
            alt="신한은행 통장/체크카드 만들기"
            width={700}
            height={150}
            className={styles.buttonImg}
          />
        </div>

        {/* 배너 하단 버튼 */}
        <div className={styles.buttonWrapper}>
          <div
            onClick={() => openExternalLink(bankLink)}
            className={styles.bottomButton}
          >
            <Image
              src={buttonImage}
              alt="신한은행 통장/체크카드 만들기"
              width={700}
              height={150}
              className={styles.bottomButton}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
