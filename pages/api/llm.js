require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import OpenAI from "openai";
export default async function handler(req, res) {
  let body = JSON.parse(JSON.stringify(req.body));
  if (req.method == "POST") {
    
    const openai = new OpenAI({
      apiKey:OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: body.data }],
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 1,
    });
    res.status(200).json(response);
  } else {
    res.status(200).json({});
  }
}
