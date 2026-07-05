import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function callOpenAI(prompt, systemPrompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openAiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: openAiModel,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const content = response?.data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('The AI service returned an empty response.');
  }

  return parseJsonResponse(content);
}

function parseJsonResponse(content) {
  const trimmed = content.trim();

  if (!trimmed) {
    throw new Error('The AI service returned an empty response.');
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch ? fencedMatch[1] : trimmed;

  try {
    return JSON.parse(candidate);
  } catch (error) {
    const startIndex = candidate.indexOf('{');
    const endIndex = candidate.lastIndexOf('}');

    if (startIndex >= 0 && endIndex > startIndex) {
      try {
        return JSON.parse(candidate.substring(startIndex, endIndex + 1));
      } catch (innerError) {
        throw new Error('The AI service response was not valid JSON.');
      }
    }

    throw new Error('The AI service response was not valid JSON.');
  }
}

export async function analyseReceipt(receipt) {
  // Build a structured prompt so the model returns a bookkeeping-oriented account-code recommendation.
  const prompt = [
    'You are helping XeroPilot classify a receipt for Xero bookkeeping.',
    'Return ONLY a JSON object with these keys: suggestedAccountCode, confidence, explanation.',
    'Instructions:',
    '- Suggest the most appropriate Xero account code for the receipt.',
    '- Explain briefly why that account code fits the transaction.',
    '- Provide a confidence score between 0 and 1.',
    '- If the details are sparse, use a conservative general expense account such as 400.',
    '',
    'Receipt data:',
    JSON.stringify(receipt, null, 2),
  ].join('\n');

  const systemPrompt = [
    'You are a careful bookkeeping assistant for XeroPilot.',
    'You must return valid JSON only and avoid extra commentary.',
    'Use practical Xero account-code reasoning suitable for small business expense categorisation.',
  ].join(' ');

  return callOpenAI(prompt, systemPrompt);
}

export async function summariseInvoice(invoice) {
  // Ask the model to provide a short finance summary plus practical follow-up guidance.
  const prompt = [
    'You are helping XeroPilot summarise a customer invoice for a finance team.',
    'Return ONLY a JSON object with these keys: summary, anomalies, recommendedAction.',
    'Instructions:',
    '- Write a concise summary in 2 to 3 sentences.',
    '- Flag any anomalies such as unusually high amount, overdue status, or many line items.',
    '- Suggest one practical next step such as send reminder, review line items, or call client.',
    '',
    'Invoice data:',
    JSON.stringify(invoice, null, 2),
  ].join('\n');

  const systemPrompt = [
    'You are a finance operations assistant for XeroPilot.',
    'You must return valid JSON only and keep the analysis practical for accounts receivable workflows.',
  ].join(' ');

  return callOpenAI(prompt, systemPrompt);
}

export async function suggestAutomations(data) {
  // Prompt the model to recommend workflow automations based on recent Xero activity.
  const prompt = [
    'You are helping XeroPilot recommend automation rules based on recent Xero activity.',
    'Return ONLY a JSON object with this shape: {"suggestions":[{"title":"string","description":"string","trigger":"string","action":"string"}]}.',
    'Instructions:',
    '- Review the supplied invoices, receipts, and bank transactions.',
    '- Recommend practical automations that would save time in XeroPilot.',
    '- Keep each suggestion specific and actionable.',
    '- Use simple trigger/action expressions that are easy to implement.',
    '',
    'Recent Xero data:',
    JSON.stringify(data, null, 2),
  ].join('\n');

  const systemPrompt = [
    'You are a workflow automation advisor for XeroPilot.',
    'You must return valid JSON only and focus on realistic automation opportunities for bookkeeping tasks.',
  ].join(' ');

  return callOpenAI(prompt, systemPrompt);
}
