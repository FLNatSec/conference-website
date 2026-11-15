import type { Speaker } from "@/lib/types";

/**
 * Confirmed speakers. Add someone only after they have agreed to be listed.
 * Hidden while features.speakers is off; the grid also stays hidden while this list is empty.
 * Headshots: public/speakers/<id>.jpg (4:5), then set `headshot`. Record the source in docs/asset-sources.md.
 * To put a speaker on a session, add their id to the session's `speakerIds` in content/editions/<year>.ts.
 *
 * Example:
 *   {
 *     id: "jane-doe",
 *     name: "Jane Doe",
 *     title: "Director of Research",
 *     organization: "Example Laboratory",
 *     bio: "Two or three sentences.",
 *     headshot: "/speakers/jane-doe.jpg",
 *     keynote: true,
 *   },
 */
export const speakers: Speaker[] = [];
