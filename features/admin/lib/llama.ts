"use server";

import { ArticleContent } from "../../../types/all";

const apiKey = process.env.LLAMA_API_KEY;

export async function generateArticle(content: ArticleContent, lang: "eng" | "ru" | "kk", textAmount: "low" | "standard" | "high", style: "steppe" | "formal" | "neutral"): Promise<ArticleContent> {
  // return {
  //   title: "Lorem Ipsum",
  //   bodyText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   mainImageUrl: "https://compote.slate.com/images/5294e6d0-53ed-4a4a-a350-7eaeab72ac93.jpeg?crop=1560%2C1040%2Cx0%2Cy0"
  // }

  const prompt = `
    You will be given an article. Your task is to edit it to fit the following parameters:\n
    language: ${lang}\n
    amount of text: ${textAmount}\n
    style: ${style}\n
    \n\nHere is the article:\n\n
    ${content.bodyText}

    Respond ONLY with a valid JSON object. Do not include any explanations, greetings, or additional text.:\n
    { title: "Create title for that article", bodyText: "Content of the your generated article" }
  `;

  const result = JSON.parse(await generateWithLlama(prompt));
  result.mainImageUrl = content.mainImageUrl;
  return result;
}

async function generateWithLlama(prompt: string): Promise<string> {
  const LLamaModel = "llama-3.3-70b-versatile";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: LLamaModel,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5
    })
  });

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content ?? "No response"
  console.log(message)
  return message;
}
