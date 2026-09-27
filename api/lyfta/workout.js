export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://my.lyfta.app/api/v1/workouts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.LYFTA_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Lyfta workouts error:", error);

    res.status(500).json({
      error: "Failed to fetch Lyfta workouts",
    });
  }
}