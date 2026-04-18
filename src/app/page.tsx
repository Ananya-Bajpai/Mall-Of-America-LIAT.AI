import { DeckNavigation } from "@/components/deck/DeckNavigation";
import { HeroOpening } from "@/components/sections/HeroOpening";
import { WhyThisProperty } from "@/components/sections/WhyThisProperty";
import { RetailShowcase } from "@/components/sections/RetailShowcase";
import { LuxuryWing } from "@/components/sections/LuxuryWing";
import { DiningLifestyle } from "@/components/sections/DiningLifestyle";
import { Entertainment } from "@/components/sections/Entertainment";
import { EventsPlatform } from "@/components/sections/EventsPlatform";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <main className="relative">
      <DeckNavigation />
      <HeroOpening />
      <WhyThisProperty />
      <RetailShowcase />
      <LuxuryWing />
      <DiningLifestyle />
      <Entertainment />
      <EventsPlatform />
      <CallToAction />
    </main>
  );
}
