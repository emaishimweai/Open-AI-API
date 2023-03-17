import { configuration } from "@/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";

type Data = {
  input: string;
};

const openai = new OpenAIApi(configuration);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Generate

    try {
      const { input } = req.body;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        //   prompt: input,
        temperature: 0.85,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const suggestion = response.data?.choices?.[0].text;
      if (suggestion === undefined) {
        throw new Error("No suggestion found");
        // res.status(r)
      }
      res.status(200).json({ result: suggestion });
    } catch (err) {
      res.status(403).json({ err: "Error has occured whilst making a post" });
    }
  }
}
