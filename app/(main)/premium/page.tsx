import {
  Pricing,
  PricingBody,
  PricingHeader,
  type PricingData,
  PricingChip,
} from "./_components/Pricing";

const freeTier: PricingData = {
  name: "Free Tier",
  price: 0,
  type: "month",
  features: [
    {
      description: "Earn Subscription Badge",
      available: true,
    },
    {
      description: "Search Boost",
      available: true,
    },
    {
      description: "Create 3 Custom Communities",
      available: false,
    },
  ],
};

// TODO:add more features

const proTier: PricingData = {
  name: "Free Tier",
  price: 5,
  type: "month",
  features: [
    {
      description: "Earn Subscription Badge",
      available: true,
    },
    {
      description: "Create 3 Custom Communities",
      available: true,
    },
    {
      description: "Search Boost",
      available: true,
    },
  ],
};

const maxTier: PricingData = {
  name: "Free Tier",
  price: 20,
  type: "month",
  features: [
    {
      description: "Earn Subscription Badge",
      available: true,
    },
    {
      description: "Create 10 Custom Communities",
      available: true,
    },
    {
      description: "Search Boost",
      available: true,
    },
  ],
};

export default function PremiumPage() {
  return (
    <main className="h-[calc(100vh-80px)]">
      <div className="flex h-full items-center justify-center gap-7">
        <Pricing className="scale-95" data={freeTier}>
          <PricingHeader />
          <PricingBody />
          <button className="btn btn-primary btn-lg mt-auto">Subscribe</button>
        </Pricing>
        <Pricing className="scale-110" data={proTier}>
          <PricingHeader />
          <PricingBody />
          <button className="btn btn-primary btn-lg mt-auto">Subscribe</button>
        </Pricing>
        <Pricing className="scale-95" data={maxTier}>
          <PricingHeader />
          <PricingBody />
          <PricingChip>Best Deal</PricingChip>
          <button className="btn btn-primary btn-lg mt-auto">Subscribe</button>
        </Pricing>
      </div>
    </main>
  );
}
