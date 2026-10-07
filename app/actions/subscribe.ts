"use server";

/*
 * Mailing-list signup → Kit (kit.com), used only as the subscriber backend.
 *
 * Credentials live in server-side environment variables (Vercel → Settings →
 * Environment Variables) and never reach the browser or the repository:
 *   KIT_API_KEY        Kit v4 API key (Settings → Developer → V4 API keys)
 *   KIT_FORM_ID        Numeric ID of the Kit form signups are added to
 *   KIT_TAG_ID         Optional. Numeric ID of the "website-signup" tag
 *   KIT_ORG_FIELD_KEY  Optional. Key of the custom field for organization
 *                      (defaults to "organization")
 *
 * Single opt-in: subscribers are created with state "active", and the Kit
 * form's "Send incentive email" setting must be turned off.
 */

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const KIT_API = "https://api.kit.com/v4";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function kit(path: string, body: unknown, apiKey: string) {
  return fetch(`${KIT_API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "X-Kit-Api-Key": apiKey },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("company_website") ?? "").trim()) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const firstName = String(formData.get("first_name") ?? "").trim().slice(0, 100);
  const organization = String(formData.get("organization") ?? "").trim().slice(0, 200);

  if (!EMAIL.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    console.error("Mailing list is not configured: set KIT_API_KEY and KIT_FORM_ID.");
    return { status: "error", message: "Signups aren’t available right now. Please email flnatsecsummit@gmail.com." };
  }

  try {
    // 1) Create (or update) the subscriber as active — single opt-in.
    const orgKey = process.env.KIT_ORG_FIELD_KEY || "organization";
    const subscriber: Record<string, unknown> = { email_address: email, state: "active" };
    if (firstName) subscriber.first_name = firstName;
    let res = await kit("/subscribers", organization ? { ...subscriber, fields: { [orgKey]: organization } } : subscriber, apiKey);
    if (!res.ok && organization) {
      // Most likely the custom field doesn't exist yet — keep the signup anyway.
      console.error("Kit create subscriber with fields failed:", res.status, await res.text());
      res = await kit("/subscribers", subscriber, apiKey);
    }
    if (!res.ok) throw new Error(`create subscriber: ${res.status} ${await res.text()}`);

    // 2) Add them to the form (so they appear under the form in Kit).
    const formRes = await kit(`/forms/${formId}/subscribers`, { email_address: email, referrer: "website" }, apiKey);
    if (!formRes.ok) throw new Error(`add to form: ${formRes.status} ${await formRes.text()}`);

    // 3) Tag as a website signup (optional; never blocks the signup).
    const tagId = process.env.KIT_TAG_ID;
    if (tagId) {
      const tagRes = await kit(`/tags/${tagId}/subscribers`, { email_address: email }, apiKey);
      if (!tagRes.ok) console.error("Kit tag failed:", tagRes.status, await tagRes.text());
    }

    return { status: "success" };
  } catch (err) {
    console.error("Mailing list signup failed:", err);
    return { status: "error", message: "Something went wrong. Please try again, or email flnatsecsummit@gmail.com." };
  }
}
