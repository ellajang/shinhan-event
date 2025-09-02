import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const languages = [
  { code: "KOR", label: "한국어" },
  { code: "ENG", label: "English" },
  { code: "IDN", label: "Bahasa Indonesia" },
  { code: "KAZ", label: "Қазақ тілі" },
  { code: "BEN", label: "বাংলা" },
  { code: "KHM", label: "ភាសាខ្មែរ" },
  { code: "MON", label: "Монгол хэл" },
  { code: "URD", label: "اردو" },
  { code: "LKA", label: "සිංහල" },
  { code: "THA", label: "ไทย" },
  { code: "UZB", label: "O'zbek tili" }, // 우즈베크어
  { code: "VNM", label: "Tiếng Việt" }, // 베트남어
  { code: "CHN", label: "中文" },       // 중국어
  { code: "RUS", label: "Русский" },   // 러시아어
  { code: "KGZ", label: "Кыргызча" },  // 키르기스어
];

const langMap = {
  ko: "KOR", en: "ENG",
  id: "IDN", kk: "KAZ", bn: "BEN", km: "KHM",
  mn: "MON", ur: "URD", lk: "LKA", ta: "TAM",
  th: "THA", uz: "UZB", vi: "VNM", cn: "CHN",
  ru: "RUS", kg: "KGZ"
};

const pngLangs = ["CHN", "ENG", "KHM", "KOR", "LKA", "MON"];

// 인앱에서 열기
const openExternalLink = (url) => {
  try {
    window.location.href = url;
    setTimeout(() => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("android")) {
        const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;
      } else if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href = url;
      }
    }, 500);
  } catch {
    window.open(url, "_self");
  }
};

export default function Home() {
  const [lang, setLang] = useState("ENG");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [bannerSrc, setBannerSrc] = useState("/images/banner_ENG.png");
  const [buttonSrc, setButtonSrc] = useState("/images/button_ENG.png");

useEffect(() => {
  const btnPath = `/images/button_${lang}.png`;
  setButtonSrc(btnPath);
}, [lang]);


  // 1) 언어 자동감지 (한 번만)
  useEffect(() => {
    const nav = (navigator.language || "").toLowerCase(); // e.g. "id-ID"
    const base = nav.split("-")[0];                        // e.g. "id"
    const mapped = langMap[base] || "ENG";
    setLang(mapped);
  }, []);

  useEffect(() => {
    const ext = pngLangs.includes(lang) ? "png" : "jpg";
    setBannerSrc(`/images/banner_${lang}.${ext}`);
  }, [lang]);

  const onBannerError = () => setBannerSrc("/images/banner_ENG.png");

  const bankLink = "https://m.shinhan.com/mw/fin/pg/FS0100S0000F01?mid=211000100100&partnerCompany=04";
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    setIsOpen(false);
  };

  return (
    <main className={styles.container}>
      {/* 언어 선택 */}
      <header className={styles.header}>
        <div
          className={styles.languageSelector}
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.currentLang}>
            {languages.find((l) => l.code === lang)?.label ?? "English"}
          </span>
          <img src="/images/lang-icon.png" alt="언어 선택" />
          {isOpen && (
            <ul className={styles.dropdownMenu}>
              {languages.map((langItem) => (
                <li
                  key={langItem.code}
                  onClick={(e) => {
                    e.stopPropagation();             // 토글 충돌 방지
                    handleLanguageChange(langItem.code);
                  }}
                >
                  {langItem.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* 메인 섹션 */}
      <section className={styles.topBanner}>
        <div className={styles.fullImage}>
          <Image
            src={bannerSrc}
            alt="메인 이미지"
            width={1080}
            height={1920}
            layout="responsive"
            priority
            onError={onBannerError}
          />
        </div>

        {/* 중간 버튼 */}
        <div
          onClick={() => openExternalLink(bankLink)}
          className={`${styles.buttonImage} ${styles.middleButton}`}
        >
          <Image
            src={buttonSrc}
            alt="신한은행 통장/체크카드 만들기"
            width={700}
            height={150}
            className={styles.buttonImg}
          />
        </div>

        {/* 하단 버튼 */}
        <div className={styles.buttonWrapper}>
          <div
            onClick={() => openExternalLink(bankLink)}
            className={styles.bottomButton}
          >
            <Image
              src={buttonSrc}
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
