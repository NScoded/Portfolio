export default async function handler(req, res) {
  try {
    const apiKey = process.env.LYFTA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "LYFTA_API_KEY is not configured in Vercel",
      });
    }

    const response = await fetch(
      "https://my.lyfta.app/api/v1/workouts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Lyfta workouts error:", error);

    return res.status(500).json({
      error: "Failed to fetch Lyfta workouts",
      message: error.message,
    });
  }
}