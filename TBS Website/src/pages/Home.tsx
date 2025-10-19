import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />

      <HowItWorks />

      <section className="bg-[#C6A9D6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedHeading>Wedding Categories</AnimatedHeading>
            <p className="mt-4 text-lg md:text-xl text-gray-600">Browse through curated collections of wedding inspiration</p>
          </div>

          <div className="mt-10 grid gap-8">
            {[
              {
                title: "Photography",
                img: "/images/hero-5591.jpg",
                align: "left",
                to: "/photos",
                desc: "Capture your special moments with stunning styles and poses",
              },
              {
                title: "Makeup",
                img: "/images/hero-5597.jpg",
                align: "right",
                to: "/photos",
                desc: "Discover beautiful bridal makeup looks for every occasion",
              },
              {
                title: "Planning & Decor",
                img: "/images/hero-5714.jpg",
                align: "left",
                to: "/photos",
                desc: "Explore creative decor ideas and planning inspiration",
              },
            ].map((c, i) => (
              <Link
                key={i}
                to={c.to}
                className={
                  "group grid items-center gap-6 rounded-xl border bg-[#C6A9D6] p-4 shadow-sm transition-transform duration-300 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02] md:grid-cols-2 " +
                  (c.align === "right" ? "md:[&>*:first-child]:order-2" : "")
                }
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img src={c.img} alt={c.title} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-600/10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#A992AC]">{c.title}</h3>
                  <p className="mt-2 text-gray-600">{c.desc}</p>
                  <span className="mt-4 inline-block text-pink-600">View Gallery →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-[#C6A9D6]">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedHeading>Latest Blog</AnimatedHeading>
          <p className="mt-4 text-lg md:text-xl text-gray-600">Expert tips, inspiration, and guides for your perfect wedding</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "10 Trending Pre-Wedding Photoshoot Ideas for 2025", badge: "Photography" },
            { title: "The Ultimate Guide to Bridal Makeup", badge: "Beauty" },
            { title: "Mehndi & Jewelry: Wedding Essentials", badge: "Traditions" },
            { title: "Sangeet Night: Planning the Perfect Celebration", badge: "Events" },
          ].map((b, i) => (
            <Link key={i} to="/blog" className="group overflow-hidden rounded-xl border bg-[#C6A9D6] shadow-sm transition-transform duration-300 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02]">
              <div className="relative h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1200&auto=format&fit=crop"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  alt="Blog"
                />
                <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-xs font-medium text-pink-700 border border-pink-200">
                  {b.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600">Read more →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-[#C6A9D6]">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedHeading>Your Wedding Journey</AnimatedHeading>
        <p className="mt-4 text-lg md:text-xl text-gray-600">From the first consultation to your special day, we'll be with you every step of the way</p>
      </div>

      {/* Timeline grid: left/right cards with centered markers */}
      <div className="relative mx-auto mt-14 grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-10">
        {/* Vertical line spanning entire timeline */}
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden lg:block -translate-x-1/2 z-0">
          <div className="h-full w-1 bg-gradient-to-b from-[#A992AC] via-[#A992AC] to-[#A992AC]" />
        </div>

        {/* Step 1 - left */}
        <div className="col-start-1">
          <StepCard number={1} title="Share your requirements" text="Tell us about your date, venue, budget, and preferences." />
        </div>
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={1} />
        </div>
        <div className="lg:col-start-3" />

        {/* Step 2 - right */}
        <div className="col-start-1 lg:col-start-1" />
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={2} />
        </div>
        <div className="lg:col-start-3">
          <StepCard number={2} title="Get a personalized proposal" text="Get the best deals on venue, catering, and decor as per your preferences." />
        </div>

        {/* Step 3 - left */}
        <div className="col-start-1">
          <StepCard number={3} title="Confirm and book" text="Choose what you love and let us handle the rest." />
        </div>
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={3} />
        </div>
        <div className="lg:col-start-3" />
      </div>
    </section>
  );
}

function AnimatedHeading({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={`text-4xl md:text-6xl font-extrabold tracking-tight text-[#A992AC] transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{
        fontFamily: "'Playfair Display', 'Times New Roman', serif",
        textShadow: isVisible ? '0 0 20px rgba(169, 146, 172, 0.3)' : 'none',
        filter: isVisible ? 'drop-shadow(0 4px 8px rgba(169, 146, 172, 0.2))' : 'none'
      }}
    >
      {children}
    </h2>
  );
}

function StepCard({ _number, title, text }: { _number?: number; title: string; text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`rounded-2xl border bg-[#C6A9D6] p-6 shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02] ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}
    >
      <h3 
        className="text-4xl md:text-5xl font-extrabold leading-tight text-[#A992AC] transform transition-all duration-800 ease-out"
        style={{
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
          textShadow: isVisible ? '0 0 15px rgba(169, 146, 172, 0.2)' : 'none'
        }}
      >
        {title}
      </h3>
      <p className="mt-3 max-w-xl text-gray-600">{text}</p>
    </div>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <div className="relative z-10">
      <div className="h-12 w-12 -translate-x-px rounded-full border-4 border-[#A992AC] bg-[#A992AC] text-[#C6A9D6] grid place-items-center font-bold shadow-md">{n}</div>
    </div>
  );
}
