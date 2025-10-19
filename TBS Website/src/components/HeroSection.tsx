import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { getHeroImages } from "../assets/images";

export default function HeroSection() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+91");
  const isValid = useMemo(() => /^\d{10}$/.test(phone.trim()), [phone]);
  const images = getHeroImages();
  const [imgIdx, setImgIdx] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>(images[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setImgIdx((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    setImgSrc(images[imgIdx % images.length]);
  }, [imgIdx, images]);

  const [submitting, setSubmitting] = useState(false);

  async function onStart() {
    // If phone is valid, hit init API then go; otherwise, just navigate to form
    if (!isValid) {
      navigate("/start-planning");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    const contact = `${code}${phone}`;
    try {
      const res = await fetch(
        "https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ contact_number: contact }),
        }
      );
      let dealId: string | undefined;
      try {
        const data = await res.json();
        if (data && (data.id || data.deal_id || data.dealId)) {
          dealId = String(data.id || data.deal_id || data.dealId);
        }
      } catch (_) {}
      const q = new URLSearchParams({ phone: contact });
      if (dealId) q.set("dealId", dealId);
      navigate(`/start-planning?${q.toString()}`);
    } catch (e) {
      navigate("/start-planning");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={imgSrc}
        onError={() => setImgSrc("https://images.unsplash.com/photo-1601121141735-ca013b7b07dd?q=80&w=1920&auto=format&fit=crop")}
        alt="Indian royal wedding bride"
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-pink-50/30 to-purple-50/30" />
      
      {/* Logo now in Navbar; keep hero clean */}

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-pink-300 bg-white/70 px-3 py-1 text-xs font-medium text-pink-700">
          India's Trusted Wedding Planning Platform
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#C6A9D6] sm:text-5xl md:text-6xl">
          Your Dream Wedding Starts Here
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-700 sm:text-lg">
          Discover endless inspiration and plan your perfect celebration with ease.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex w-full max-w-xl items-stretch gap-2">
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded border bg-white px-3 py-3 text-sm"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter your 10-digit phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 rounded border px-3 py-3"
            />
          </div>
          <button
            onClick={onStart}
            disabled={!isValid || submitting}
            className={
              "inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-white shadow " +
              (isValid && !submitting
                ? "bg-[#C6A9D6] hover:opacity-95 text-[#A992AC]"
                : "bg-gray-300 cursor-not-allowed")
            }
          >
            {submitting ? "Submitting..." : "Start My Wedding Planning"}
          </button>
        </div>
        {!isValid && phone.length > 0 && (
          <p className="mt-1 text-sm text-pink-700">Enter a valid 10-digit number</p>
        )}
        <div className="mt-8 text-sm text-gray-700">
          <span className="font-semibold">10K+ </span>Happy Couples | <span className="font-semibold">50K+ </span>
          Wedding Photos | <span className="font-semibold">500+ </span>Real Weddings
        </div>
      </div>
    </section>
  );
}

