"use client";
import { createContext, use, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import cn from "@/utils/cn";

export type PricingData = {
  name: string;
  price: number;
  type: "month" | "year";
  features: {
    description: string;
    available: boolean;
  }[];
};

const data: PricingData = {
  name: "Free Tier",
  price: 5,
  type: "month",
  features: [
    {
      description: "Unlimited posts per month",
      available: true,
    },
    {
      description: "Unlimited posts per month",
      available: true,
    },
    {
      description: "Unlimited posts per month",
      available: true,
    },
    {
      description: "Unlimited posts per month",
      available: true,
    },
  ],
};

const PricingContext = createContext<PricingData>(data);

export function Pricing({
  data,
  children,
  className,
}: {
  data: PricingData;
  className?: string;
  children: ReactNode;
}) {
  return (
    <PricingContext value={data}>
      <div
        className={cn(
          "relative flex h-[70dvh] flex-1 flex-col gap-8 rounded-lg border-2 border-primary p-4 shadow-xl shadow-blue-500/20",
          className,
        )}
      >
        {children}
      </div>
    </PricingContext>
  );
}

export function PricingHeader() {
  const pricing = use(PricingContext);
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-[30px] font-semibold">{pricing.name}</h1>
      <h2 className="text-[40px] font-semibold">
        {pricing.price}$/{pricing.type}
      </h2>
    </div>
  );
}

export function PricingBody() {
  const pricing = use(PricingContext);
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {pricing.features.map((feature) => (
          <li key={feature.description} className="flex items-center gap-3">
            <span className={`${feature.available || "text-gray-700"}`}>
              {feature.available ? <Check /> : <Minus />}
            </span>
            <span className={`${feature.available || "text-gray-700"}`}>{feature.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingChip({ children }: { children: ReactNode }) {
  return (
    <span className="absolute left-1/2 z-40 -translate-x-1/2 -translate-y-[calc(100%-4px)] rounded-full bg-primary px-5 py-3 font-semibold text-white">
      {children}
    </span>
  );
}
