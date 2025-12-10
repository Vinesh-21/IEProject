"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";
export default function NotFoundPage() {
  return (
    <section className="w-screen h-screen px-3 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEFFE_66%)]   overflow-hidden">
      <div>
        <div className="md:flex items-center">
          {/* LEFT SIDE TEXT */}
          <div className="md:w-1/2 p-6 md:p-10">
            <span className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
              Page Not Found
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-linear-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Oops! 404
            </h1>

            <p className="text-lg md:text-xl text-[#010D3E] tracking-tight mt-6">
              The page you’re looking for doesn’t exist. It may have been moved
              or deleted.
            </p>

            <div className="flex gap-3 items-center mt-8">
              <Button className="flex items-center gap-2 text-white bg-linear-to-b from-black to-[#001E80]">
                <Link href="/">Back to Home</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/">Contact Support</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE — Matching Hero style */}
          <div className="md:w-1/2 relative flex justify-center md:justify-end mt-10 md:mt-0">
            <Image
              src="/orange-container.png"
              alt="container not found"
              width={650}
              height={650}
              className="w-[80%] md:w-[90%] lg:w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
