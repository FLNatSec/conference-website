import type { Metadata } from "next";
import { HomeLabControls, type HomeLabState } from "@/components/dev/LabControls";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { MissionSection, ProgramPreview } from "@/components/sections/home/HomeSections";

export const metadata: Metadata = {
  title: "Prototype lab",
  robots: { index: false, follow: false },
};

export default async function LabPage({ searchParams }: PageProps<"/lab">) {
  const params = await searchParams;

  const state: HomeLabState = {
    title: params.title === "editorial" || params.title === "anchored" ? params.title : "expanded",
    tagline: params.tagline === "mono" ? "mono" : "sans",
    poster: params.poster === "1",
  };

  return (
    <>
      <HomeHero
        key={JSON.stringify(state)}
        titleVariant={state.title}
        taglineStyle={state.tagline}
        posterOnly={state.poster}
      />
      <MissionSection />
      <ProgramPreview />
      <HomeLabControls state={state} />
    </>
  );
}
