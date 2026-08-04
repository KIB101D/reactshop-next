// app/components/Hero.tsx
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Головний баннер (з картинкою + градієнтом bg-grad-hero) */}
      <div className="lg:col-span-2 h-[220px] sm:h-[320px] lg:h-[400px] rounded-3xl relative overflow-hidden flex flex-col justify-end md:justify-center lg:justify-end p-5 sm:p-8">
        {/* Картинка */}
        <Image
          src="/images/banners/electronics-hero.png"
          alt="Electronics"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover z-0"
        />
        {/* Градієнтний оверлей поверх картинки */}
        <div className="absolute inset-0 bg-grad-hero opacity-45 z-10 pointer-events-none" />

        {/* Текстовий контент */}
        <div className="relative z-20 flex flex-col justify-end md:justify-center lg:justify-end">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-indigo-200 uppercase mb-1 sm:mb-2">
            New season
          </span>
          <h1 className="font-heading font-semibold text-white text-[clamp(1.4rem,5vw,3rem)] leading-tight max-w-md">
            Electronics that keep up with your day
          </h1>
          <p className="hidden sm:block text-indigo-100 mt-2 max-w-sm text-sm">
            Laptops, audio and wearables — up to 30% off this week.
          </p>
          <Link
            href="/category/Electronics"
            className="mt-3 sm:mt-5 w-fit px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 rounded-xl font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors"
          >
            Shop electronics
          </Link>
        </div>
      </div>

      {/* Бокові баннери */}
      <div className="grid grid-cols-2 gap-3 h-24 sm:h-28 md:h-32 lg:h-[400px] lg:flex lg:flex-col lg:gap-6">
        {/* 2. Перший боковий (з картинкою + градієнтом bg-grad-side1) */}
        <Link
          href="/category/Clothing"
          className="relative overflow-hidden w-full h-full lg:h-1/2 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 flex flex-col justify-end group"
        >
          <Image
            src="/images/banners/fresh-drop.png"
            alt="Fresh drop"
            fill
            sizes="(max-width: 1024px) 50vw, 380px"
            className="object-cover z-0 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-grad-side1 opacity-30 z-10 pointer-events-none" />

          <div className="relative z-20">
            <span className="hidden md:block text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-purple-200 uppercase mb-1">
              Fresh drop
            </span>
            <p className="font-heading font-semibold text-white text-xs sm:text-sm lg:text-xl leading-snug">
              New arrivals in Clothing
            </p>
          </div>
        </Link>

        {/* 3. Другий боковий (БЕЗ картинки, чисто bg-grad-side2) */}
        <Link
          href="/"
          className="w-full h-full lg:h-1/2 rounded-2xl lg:rounded-3xl bg-grad-side2 p-3 sm:p-4 lg:p-6 flex flex-col justify-end hover:opacity-95 transition-opacity"
        >
          <span className="hidden md:block text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-pink-200 uppercase mb-1">
            Weekend only
          </span>
          <p className="font-heading font-semibold text-white text-xs sm:text-sm lg:text-xl leading-snug">
            Free shipping over $50
          </p>
        </Link>
      </div>
    </section>
  );
}
