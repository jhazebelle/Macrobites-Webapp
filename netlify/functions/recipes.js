exports.handler = async function (event, context) {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const TAB_NAME = process.env.TAB_NAME || "Sheet1";
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

    if (!SHEET_ID || !API_KEY) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Missing env vars: SHEET_ID or GOOGLE_SHEETS_API_KEY",
        }),
      };
    }

    const range = encodeURIComponent(`${TAB_NAME}!A1:Z998`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: String(err) }),
    };
  }
};

