import React, { useMemo, useState } from "react";
import { IMAGES } from "../../assets/images";
import { useSearchParams, useNavigate } from "react-router-dom";

type CategoryKey = "photography" | "makeup" | "decor";

export default function PlanningForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const contactFromQuery = params.get("phone") || "";
  const dealIdFromQuery = params.get("dealId") || "";
  const [step, setStep] = useState(0); // 0: categories, 1..5 steps
  const [selectedCategories, setSelectedCategories] = useState<Record<CategoryKey, boolean>>({
    photography: false,
    makeup: false,
    decor: false,
  });
  const [city, setCity] = useState<string>("");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [year, setYear] = useState<number | null>(2025);
  const [month, setMonth] = useState<string>("Nov");
  const [dateRange, setDateRange] = useState<string>("");
  const [dateNotConfirmed, setDateNotConfirmed] = useState(false);
  const [guests, setGuests] = useState<string>("");
  const [budget, setBudget] = useState<{ photography?: number; makeup?: number; decor?: number }>({});
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canProceedCategories = useMemo(
    () => Object.values(selectedCategories).some(Boolean),
    [selectedCategories]
  );

  function toggleCategory(k: CategoryKey) {
    setSelectedCategories((s) => ({ ...s, [k]: !s[k] }));
  }

  const stepsTotal = 5;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#C6A9D6]">
      {/* Left: animated mandap area (simple placeholder) */}
      <div className="hidden lg:flex items-center justify-center bg-white p-10">
        <img
          src={IMAGES.logo}
          alt="TBS — The Bride Side"
          className="max-h-80 w-auto"
          onError={(e)=>{(e.currentTarget as HTMLImageElement).style.opacity='0';}}
        />
      </div>

      {/* Right: steps */}
      <div className="p-6 sm:p-10">
        {/* Step header */}
        {step === 0 ? (
          <>
            <p className="text-sm text-gray-500">Select your wedding services</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#A992AC]">Select Your Wedding Services</h2>
            <p className="mt-1 text-gray-600">Choose one or more services</p>
            <div className="mt-6 grid gap-4">
              {[
                { k: "photography", title: "Photography", desc: "Professional wedding photography and videography" },
                { k: "makeup", title: "Makeup", desc: "Bridal makeup and beauty services" },
                { k: "decor", title: "Planning & Decor", desc: "Complete wedding planning and decoration" },
              ].map((c: any) => {
                const active = selectedCategories[c.k as CategoryKey];
                return (
                  <label key={c.k} className={"flex cursor-pointer items-start gap-4 rounded-2xl border p-4 shadow-sm " + (active ? "border-pink-400 bg-pink-50" : "hover:shadow") }>
                    <input type="checkbox" className="mt-1" checked={active} onChange={() => toggleCategory(c.k as CategoryKey)} />
                    <span className="flex-1">
                      <span className="block text-lg font-semibold">{c.title}</span>
                      <span className="block text-sm text-gray-600">{c.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <button disabled={!canProceedCategories} onClick={() => setStep(1)} className={"mt-8 w-full rounded-md px-6 py-3 font-semibold text-white shadow " + (canProceedCategories ? "bg-[#A992AC] hover:opacity-95 text-[#C6A9D6]" : "bg-gray-300 cursor-not-allowed")}>Next</button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">{step}/{stepsTotal} steps</p>
            {step === 1 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-[#A992AC]">Where do you want to host your wedding?</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {label: "Top Cities", key: "top"},
                    {label: "Popular Cities", key: "popular"},
                    {label: "Other Cities", key: "other"},
                    {label: "States", key: "states"},
                    {label: "International Cities", key: "intl"},
                    {label: "Not listed here", key: "not_listed"},
                  ].map(b => (
                    <button
                      key={b.key}
                      onClick={() => {
                        if (b.key === "not_listed") { setCity("Not listed"); setStep(2); return; }
                        setShowCityPicker(true);
                      }}
                      className={"rounded-2xl border p-6 text-center shadow-sm bg-white hover:shadow " + (city && city!=="Not listed"?"":"")}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600">{city && `Selected: ${city}`}</div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(0)} className="rounded border px-4 py-2">Back</button><button disabled={!city} onClick={()=>setStep(2)} className={"rounded px-6 py-2 text-white " + (city?"bg-[#A992AC] hover:opacity-95 text-[#C6A9D6]":"bg-gray-300")}>Next</button></div>

                {showCityPicker && (
                  <CityPicker onClose={()=>setShowCityPicker(false)} onSelect={(c)=>{setCity(c); setShowCityPicker(false); setStep(2);}} />
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-[#A992AC]">When do you plan to have your wedding?</h2>
                <div className="mt-4 flex gap-2">
                  {[2025,2026,2027].map((y)=> (
                    <button key={y} onClick={()=>setYear(y)} className={"rounded-full px-4 py-2 " + (year===y?"bg-amber-300/70":"bg-white border")}>{y}</button>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select value={month} onChange={(e)=>setMonth(e.target.value)} className="rounded border px-3 py-2">
                    {"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").map((m)=>(<option key={m} value={m}>{m}</option>))}
                  </select>
                  <input value={dateRange} onChange={(e)=>setDateRange(e.target.value)} placeholder="Start date – End date" className="rounded border px-3 py-2" />
                </div>
                <label className="mt-3 flex items-center gap-2"><input type="checkbox" checked={dateNotConfirmed} onChange={(e)=>setDateNotConfirmed(e.target.checked)} /> The wedding date isn’t confirmed yet</label>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(1)} className="rounded border px-4 py-2">Back</button><button onClick={()=>setStep(3)} className="rounded bg-[#A992AC] hover:opacity-95 px-6 py-2 text-[#C6A9D6]">Next</button></div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-[#A992AC]">How many guests are you expecting?</h2>
                <input value={guests} onChange={(e)=>setGuests(e.target.value.replace(/\D/g,""))} placeholder="e.g., 150" className="mt-4 w-full rounded border px-3 py-3" />
                <p className="mt-2 text-sm text-gray-600">💡 Mention the total guests of your wedding day</p>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(2)} className="rounded border px-4 py-2">Back</button><button disabled={!guests} onClick={()=>setStep(4)} className={"rounded px-6 py-2 text-white " + (guests?"bg-[#A992AC] hover:opacity-95 text-[#C6A9D6]":"bg-gray-300")}>Next</button></div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-[#A992AC]">What is your estimated budget?</h2>
                <div className="mt-6 grid gap-6">
                  {selectedCategories.photography && (
                    <BudgetSlider label="Photography" min={50000} max={1000000} value={budget.photography} onChange={(v)=>setBudget(b=>({...b, photography:v}))} helper="Professional photography and videography services" />
                  )}
                  {selectedCategories.makeup && (
                    <BudgetSlider label="Makeup" min={25000} max={500000} value={budget.makeup} onChange={(v)=>setBudget(b=>({...b, makeup:v}))} helper="Bridal makeup and beauty services for all events" />
                  )}
                  {selectedCategories.decor && (
                    <BudgetSlider label="Planning & Decor" min={100000} max={2000000} value={budget.decor} onChange={(v)=>setBudget(b=>({...b, decor:v}))} helper="Complete wedding planning and decoration" />
                  )}
                </div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(3)} className="rounded border px-4 py-2">Back</button><button onClick={()=>setStep(5)} className="rounded bg-[#A992AC] hover:opacity-95 px-6 py-2 text-[#C6A9D6]">Next</button></div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold text-[#A992AC]">What shall we call you?</h2>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="mt-4 w-full rounded border px-3 py-3" />
                <button
                  disabled={!name || submitting}
                  onClick={async ()=>{
                    if (!name || submitting) return;
                    setSubmitting(true);
                    // Build payload per spec
                    const selectedNames: Array<"Photography"|"Makeup"|"Planning & Decor"> = [];
                    if (selectedCategories.photography) selectedNames.push("Photography");
                    if (selectedCategories.makeup) selectedNames.push("Makeup");
                    if (selectedCategories.decor) selectedNames.push("Planning & Decor");
                    const monthIndex = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(month);
                    const deriveDate = () => {
                      const trimmed = (dateRange || "").trim();
                      // if already YYYY-MM-DD
                      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
                      // if only day like "22", combine with selected year+month
                      if (/^\d{1,2}$/.test(trimmed) && year && monthIndex >= 0) {
                        const d = trimmed.padStart(2, '0');
                        const m = String(monthIndex + 1).padStart(2,'0');
                        return `${year}-${m}-${d}`;
                      }
                      // if date not confirmed or missing, omit
                      if (dateNotConfirmed) return undefined as unknown as string;
                      // fallback to first of month when year+month known
                      if (year && monthIndex >= 0) {
                        const m = String(monthIndex + 1).padStart(2,'0');
                        return `${year}-${m}-01`;
                      }
                      return undefined as unknown as string;
                    };
                    const eventDate = deriveDate();
                    const catObjs = selectedNames.map((n)=>({
                      name: n,
                      venue: city || undefined,
                      budget:
                        n === "Photography" ? budget.photography :
                        n === "Makeup" ? budget.makeup :
                        budget.decor,
                      event_date: eventDate,
                      expected_gathering: guests ? Number(guests) : undefined,
                    }));
                    const payload = {
                      name,
                      categories: catObjs,
                      contact_number: contactFromQuery || undefined,
                    };
                    try {
                      if (dealIdFromQuery) {
                        const detailsPayload = { name, categories: catObjs };
                        await fetch(
                          `https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/${dealIdFromQuery}/details`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              accept: "application/json",
                            },
                            body: JSON.stringify(detailsPayload),
                          }
                        );
                      } else {
                        // fallback: create if no id present
                        await fetch(
                          "https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/init",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              accept: "application/json",
                            },
                            body: JSON.stringify({ contact_number: contactFromQuery || undefined }),
                          }
                        );
                      }
                    } catch(e) {
                      // ignore errors; you can surface a toast if needed
                    } finally {
                      setSubmitting(false);
                      navigate("/start-planning?submitted=true");
                    }
                  }}
                  className={
                    "mt-6 w-full rounded px-6 py-3 font-semibold text-white " +
                    (name && !submitting ? "bg-[#A992AC] hover:opacity-95 text-[#C6A9D6]" : "bg-gray-300 cursor-not-allowed")
                  }
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <div className="mt-4 text-sm text-gray-600">We will contact you with personalized recommendations.</div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(4)} className="rounded border px-4 py-2">Back</button></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CityPicker({ onClose, onSelect }:{ onClose: ()=>void; onSelect:(city:string)=>void }){
  const sections: Array<{ title: string; cities: string[] }> = [
    {
      title: "Top Cities",
      cities: [
        "All Cities","Delhi NCR","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Lucknow","Jaipur","Kolkata","Chandigarh"
      ],
    },
    {
      title: "Popular Cities",
      cities: [
        "Gurgaon","Goa","Udaipur","Jim Corbett","Indore","Agra","Kanpur","Ahmedabad","Navi Mumbai","Kochi"
      ],
    },
    {
      title: "Other Cities",
      cities: [
        "Ludhiana","Jodhpur","Patna","Ranchi","Agra","Amritsar","Rishikesh","Varanasi","Nainital","Alwar","Shimla","Srinagar","Mysore","Coimbatore","Bhopal","Indore","Patiala","Surat","Ahmedabad","Nagpur","Jammu","Mount Abu","Mahabalipuram","Darjeeling","Bhubaneswar","Tirupati","Guwahati","Pondicherry","Bikaner","Vishakhapatnam","Kottayam","Kumarakom","Ranthambhore","Dehradun","Thane","Vadodara","Raipur"
      ],
    },
    {
      title: "States",
      cities: [
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
      ],
    },
    { title: "International Cities", cities: ["Dubai","Thailand","Bali","Abu Dhabi","Vietnam"] },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4 sm:p-10" onClick={onClose}>
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Select City</h3>
          <button onClick={onClose} className="rounded border px-3 py-1">Close</button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-y-6 gap-x-16">
          {sections.map(sec => (
            <div
              key={sec.title}
              className={
                "min-w-0 " +
                (sec.title === "Other Cities" ? "pr-4 " : "") +
                (sec.title === "States" ? "pl-4 " : "")
              }
            >
              <h4 className="font-semibold text-pink-600">{sec.title}</h4>
              {sec.title === "Other Cities" ? (
                <div className="mt-2 grid grid-cols-2 gap-x-8">
                  <div className="space-y-2 pr-2">
                    {sec.cities.slice(0, Math.ceil(sec.cities.length/2)).map(c => (
                      <button key={c} className="block text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    ))}
                  </div>
                  <div className="space-y-2 pl-2">
                    {sec.cities.slice(Math.ceil(sec.cities.length/2)).map(c => (
                      <button key={c} className="block text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="mt-2 space-y-2 pr-2">
                  {sec.cities.map(c => (
                    <li key={c}>
                      <button className="text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BudgetSlider({ label, min, max, value, onChange, helper }:{ label:string; min:number; max:number; value:number|undefined; onChange:(v:number)=>void; helper:string }){
  const current = value ?? min;
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{label} Budget</h3><span className="text-pink-600 font-bold">₹{Math.round(current/1000)}K</span></div>
      <input type="range" min={min} max={max} value={current} onChange={(e)=>onChange(Number(e.target.value))} className="mt-3 w-full" />
      <div className="mt-2 flex justify-between text-sm text-gray-600"><span>₹{Math.round(min/1000)}K</span><span>₹{Math.round(max/100000)} Lakhs</span></div>
      <p className="mt-3 text-sm text-gray-700">💡 {helper}</p>
    </div>
  );
}


