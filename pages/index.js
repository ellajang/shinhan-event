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
  const ua = navigator.userAgent.toLowerCase();

  // 1. 카카오톡 인앱(외부 브라우저 스킴)
  if (ua.includes("kakaotalk")) {
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
    setTimeout(() => {
      alert("카카오톡에서 외부 브라우저로 이동이 안 되면, 우측 상단 '···' 메뉴에서 '기타 브라우저로 열기'를 이용하세요.");
    }, 1000);
    return;
  }

  // 2. 라인 인앱(외부 브라우저 파라미터)
  if (ua.includes("line")) {
    window.location.href = url + (url.includes('?') ? '&' : '?') + 'openExternalBrowser=1';
    return;
  }

  // 3. 안드로이드 인텐트(크롬 앱)
  if (ua.includes("android")) {
    const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = intentUrl;
    return;
  }

  // 4. iOS(사파리 시도, 그러나 강제 불가)
  if (/iphone|ipad|ipod/.test(ua)) {
    window.open(url, "_blank");
    setTimeout(() => {
      alert("iOS 인앱에서는 외부 브라우저(사파리)로 강제 이동이 불가능할 수 있습니다. 직접 복사해서 사파리에서 열어주세요!");
    }, 800);
    return;
  }

  // 5. 기타(PC 등)
  window.open(url, "_blank");
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
