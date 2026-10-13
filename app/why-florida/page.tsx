import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { WhyFloridaOpener } from "@/components/sections/why-florida/WhyFloridaOpener";
import {
  FloridaHistory,
  FloridaOpportunity,
  FloridaSources,
  FloridaToday,
} from "@/components/sections/why-florida/WhyFloridaSections";

export const metadata: Metadata = {
  title: "Why Florida",
  description:
    "Florida is a strategic hub for national security: military commands, space, industry, research, and talent across the state. The opportunity is to connect them.",
};

// Present (capabilities + map) → past → the opportunity and why the summit exists.
export default function WhyFloridaPage() {
  return (
    <>
      <WhyFloridaOpener />
      <FloridaToday />
      <FloridaHistory />
      <FloridaOpportunity />
      <FloridaSources />
      <CtaBand />
    </>
  );
}
