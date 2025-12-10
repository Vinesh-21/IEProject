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
  DropdownMenuSeparator,
  DropdownMenuLabel,
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

      {/* NAV WRAPPER */}
      <div className="py-5">
        <div className="container">
          <div className="flex justify-between items-center px-3">
            {/* LOGO */}
            <Image
              src="/logo.svg"
              alt="House-OF-SiRa-Logo"
              width={40}
              height={40}
            />

            {/* ---------------- MOBILE DROPDOWN ---------------- */}
            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-semibold">
                  Menu
                </DropdownMenuLabel>

                {["home", "product", "aboutUs", "contact", "blog"].map(
                  (item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => router.push("#")}
                      className="text-[15px]"
                    >
                      {t(item)}
                    </DropdownMenuItem>
                  )
                )}

                <DropdownMenuItem onClick={() => router.push("#")}>
                  {t("dashboard")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="font-semibold">
                  Language
                </DropdownMenuLabel>

                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={
                      currentLocale === lang.code
                        ? "bg-black/10 font-semibold border border-black/20"
                        : ""
                    }
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="justify-center">
                  <Button className="w-full bg-black text-white">
                    {t("requestAQuote")}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* ------------------------------------------------ */}

            {/* DESKTOP NAV */}
            <nav className="items-center gap-6 hidden md:flex text-black/60">
              {["home", "product", "aboutUs", "contact", "blog"].map((item) => (
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

              {/* DESKTOP LANGUAGE SWITCHER */}
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
                      className={`cursor-pointer ${
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
      </div>
    </header>
  );
}
