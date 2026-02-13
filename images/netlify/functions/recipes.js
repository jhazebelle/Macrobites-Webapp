export default async (req) => {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const TAB_NAME = process.env.TAB_NAME || "Sheet1";
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

    if (!SHEET_ID || !API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing env vars: SHEET_ID or GOOGLE_SHEETS_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const range = encodeURIComponent(`${TAB_NAME}!A1:Z998`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error || data }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

