export default async function handler(req, res) {
  const { orgnr } = req.query;

  if (!orgnr) {
    res.status(400).json({ error: "Missing orgnr" });
    return;
  }

  try {
    const url = `https://data.brreg.no/regnskapsregisteret/regnskap/${orgnr}`;
    const response = await fetch(url);

    if (!response.ok) {
      res.status(response.status).json({
        error: "Brreg request failed",
        status: response.status
      });
      return;
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
