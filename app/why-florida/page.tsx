import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { WhyFloridaOpener } from "@/components/sections/why-florida/WhyFloridaOpener";
import {
  FloridaHistory,
  FloridaOpportunity,
  FloridaSources,
  FloridaToday,
  WhyThisSummit,
} from "@/components/sections/why-florida/WhyFloridaSections";

export const metadata: Metadata = {
  title: "Why Florida",
  description:
    "Florida is a statewide national-security ecosystem — commands, launch, ports, research, industry, and talent. The opportunity is to connect them.",
};

// Present → past → future → why this summit exists.
export default function WhyFloridaPage() {
  return (
    <>
      <WhyFloridaOpener />
      <FloridaToday />
      <FloridaHistory />
      <FloridaOpportunity />
      <WhyThisSummit />
      <FloridaSources />
      <CtaBand />
    </>
  );
}
