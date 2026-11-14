import { icsFilename, summitIcs } from "@/lib/calendar";

// Calendar invite for "Save the date" (Apple Calendar, Outlook, and others). Built at deploy time.
export const dynamic = "force-static";

export function GET() {
  return new Response(summitIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${icsFilename()}"`,
    },
  });
}
