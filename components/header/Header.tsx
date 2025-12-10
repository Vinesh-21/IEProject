"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { GiCargoCrate } from "react-icons/gi";
import { MenuIcon, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [mobileOpen, setMobileOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "ms", label: "Malay" },
    { code: "ta", label: "Tamil" },
    { code: "th", label: "Thai" },
    { code: "de", label: "German" },
    { code: "ja", label: "Japanese" },
    { code: "ko", label: "Korean" },
    { code: "zh", label: "Chinese" },
  ];

  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      {/* TOP BAR */}
      <div className="bg-black text-white flex justify-center items-center py-3 gap-x-2 text-[12px] md:text-[16px]">
        <p>{t("Welcome")}</p>
        <GiCargoCrate className="size-4 md:size-5" />
      </div>

      {/* NAVIGATION */}
      <div className="py-5 relative">
        <div className="container">
          <div className="flex justify-between items-center px-3">
            {/* LOGO */}
            <Image
              src="/logo.svg"
              alt="House-OF-SiRa-Logo"
              width={40}
              height={40}
            />

            {/* MOBILE MENU ICON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden transition-all hover:scale-110"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>

            {/* DESKTOP NAV */}
            <nav className="items-center gap-6 hidden md:flex text-black/60">
              {["home", "product", "aboutUs", "contact"].map((item) => (
                <a
                  key={item}
                  href=""
                  className="transition-all hover:text-black hover:translate-x-1"
                >
                  {t(item)}
                </a>
              ))}

              <a className="transition-all hover:text-black hover:translate-x-1">
                {t("dashboard")}
              </a>

              <Button className="tracking-tighter hover:scale-[1.02] transition">
                {t("requestAQuote")}
              </Button>

              {/* LANGUAGE SWITCHER */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {currentLocale.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-32">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`cursor-pointer rounded-md transition-all 
                        hover:bg-[#E5E7EB] hover:translate-x-1
                        ${
                          currentLocale === lang.code
                            ? "font-semibold bg-black/10 border border-black/20"
                            : ""
                        }`}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileOpen && (
          <nav className="md:hidden absolute right-3 mt-3 bg-white shadow-lg rounded-md p-5 flex flex-col gap-4 w-44 text-black/80 z-50 animate-fadeIn">
            {["home", "product", "aboutUs", "contact"].map((item) => (
              <a
                key={item}
                href=""
                onClick={() => setMobileOpen(false)}
                className="transition-all hover:text-black hover:translate-x-1"
              >
                {t(item)}
              </a>
            ))}

            <a
              onClick={() => setMobileOpen(false)}
              className="transition-all hover:text-black hover:translate-x-1"
            >
              {t("dashboard")}
            </a>

            {/* Language Selector */}
            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2">Language</p>
              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-left transition-all hover:translate-x-1 hover:text-black
                      ${
                        currentLocale === lang.code
                          ? "font-bold bg-black/10 border border-black/20 px-2 py-1 rounded"
                          : ""
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
