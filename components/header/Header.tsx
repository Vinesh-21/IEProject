"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { GiCargoCrate } from "react-icons/gi";
import { MenuIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

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
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      {/* TOP BAR */}
      <div className="bg-black text-white flex justify-center items-center py-3 gap-x-2 text-[12px] md:text-[16px]">
        <p>{t("Welcome")}</p>
        <GiCargoCrate className="size-4 md:size-5" />
      </div>

      {/* NAVIGATION */}
      <div className="py-5">
        <div className="container">
          <div className="flex justify-between items-center px-3">
            {/* LOGO */}
            <div>
              <Image
                src="/logo.svg"
                alt="House-OF-SiRa-Logo"
                width={40}
                height={40}
              />
            </div>

            {/* MOBILE MENU ICON */}
            <MenuIcon className="h-5 w-5 md:hidden" />

            {/* DESKTOP NAV */}
            <nav className="items-center gap-6 hidden md:flex text-black/60">
              <a href="">{t("home")}</a>
              <a href="">{t("product")}</a>
              <a href="">{t("aboutUs")}</a>
              <a href="">{t("contact")}</a>
              <a>{t("dashboard")}</a>

              <Button className="tracking-tighter">{t("requestAQuote")}</Button>

              {/* 🌐 LANGUAGE SWITCHER — SHADCN */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {currentLocale.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-28">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={
                        currentLocale === lang.code ? "font-semibold" : ""
                      }
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
