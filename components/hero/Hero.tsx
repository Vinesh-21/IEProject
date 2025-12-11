"use client";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEFFE_100%)] overflow-x-clip overflow-hidden max-h-screen">
      <div className="container px-3">
        <div className="md:flex ">
          {/* LEFT TEXT */}
          <div className="md:w-1/2 p-6 md:p-10">
            <span className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
              {t("goodsFromIndia")}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-linear-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              {t("heroTitle")}
            </h1>

            <p className="text-lg md:text-xl text-[#010D3E] tracking-tight mt-6">
              {t("heroSubtitle")}
            </p>

            <div className="flex gap-3 items-center mt-8">
              <Button className="flex items-center gap-2 text-white bg-linear-to-b from-black to-[#001E80]  hover:scale-[1.04] transition-all">
                {t("getAQuote")}
                <span className="bg-[#ff9d00] w-6 h-6 rounded-full flex items-center justify-center font-bold ">
                  <MdOutlineArrowRightAlt color="white" size={20} />
                </span>
              </Button>

              <button className="flex justify-center items-center gap-2 hover:scale-[1.04] transition-all">
                {t("products")} <FaExternalLinkAlt size={12} />
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 relative flex justify-center md:justify-end mt-10 md:mt-0 select-none overflow-hidden">
            <motion.img
              src="/orange-container.png"
              alt="container export"
              className="w-[80%] md:w-[90%] lg:w-full object-contain h "
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 4,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
