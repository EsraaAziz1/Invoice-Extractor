import { OpenAI } from "openai";
import config from "../config";

export const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: config.HF_TOKEN,
});

export const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";