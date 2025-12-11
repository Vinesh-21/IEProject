"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { GiCargoCrate } from "react-icons/gi";
import { MenuIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />

            {/* ---------------- MOBILE MENU (POPOVER) ---------------- */}
            <Popover>
              <PopoverTrigger className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="end"
                className="w-56 p-4 rounded-lg shadow-lg"
              >
                <div className="flex flex-col gap-3 text-[15px] text-black/80">
                  {["home", "product", "aboutUs", "contact", "blog"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => router.push(item)}
                        className="text-left hover:translate-x-1 transition"
                      >
                        {t(item)}
                      </button>
                    )
                  )}

                  <Link
                    href={"/dashboard"}
                    className="text-left hover:translate-x-1 transition"
                  >
                    {t("dashboard")}
                  </Link>

                  {/* Language Selector */}
                  <div className="border-t pt-3 mt-2">
                    <p className="text-sm font-semibold mb-1">Language</p>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`text-left w-full px-2 py-1 rounded transition ${
                          currentLocale === lang.code
                            ? "bg-black/10 font-semibold border border-black/20"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  <Button className="w-full mt-3 bg-black text-white">
                    {t("requestAQuote")}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {/* ------------------------------------------------ */}

            {/* DESKTOP NAV */}
            <nav className="items-center gap-6 hidden md:flex text-black/60">
              {["home", "product", "aboutUs", "contact", "blog"].map((item) => (
                <Link
                  key={item}
                  href={item}
                  className="transition-all hover:text-black hover:translate-x-1"
                >
                  {t(item)}
                </Link>
              ))}

              <Link
                href={"/dashboard"}
                className="text-left hover:translate-x-1 transition"
              >
                {t("dashboard")}
              </Link>

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
                      className={
                        currentLocale === lang.code
                          ? "font-semibold bg-black/10 border border-black/20"
                          : ""
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
