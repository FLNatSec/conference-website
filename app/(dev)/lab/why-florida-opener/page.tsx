import type { Metadata } from "next";
import { MapLabControls, type MapLabState } from "@/components/dev/LabControls";
import { WhyFloridaOpener } from "@/components/sections/why-florida/WhyFloridaOpener";

export const metadata: Metadata = {
  title: "Why Florida opener · lab",
  robots: { index: false, follow: false },
};

const flag = (value: string | string[] | undefined, fallback: boolean) =>
  value === undefined ? fallback : value === "1";

export default async function WhyFloridaOpenerLab({ searchParams }: PageProps<"/lab/why-florida-opener">) {
  const params = await searchParams;
  const anchors = Number(params.anchors);

  const state: MapLabState = {
    anchors: anchors === 6 || anchors === 7 ? anchors : 8,
    context: flag(params.context, true),
    waterlines: flag(params.waterlines, true),
    labels: flag(params.labels, true),
  };

  return (
    <>
      <WhyFloridaOpener
        key={JSON.stringify(state)}
        map={{
          anchors: state.anchors,
          showContext: state.context,
          showWaterlines: state.waterlines,
          showLabels: state.labels,
        }}
      />
      <MapLabControls state={state} />
    </>
  );
}
