import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { question, spread, cards } = await request.json();

    const cardsDescription = cards.map((c: any) => 
      `- Position "${c.position}": ${c.name}${c.reversed ? ' (REVERSED)' : ''}\n  Keywords: ${c.keywords.join(', ')}\n  Meaning: ${c.reversed ? c.reversedMeaning : c.upright}`
    ).join('\n\n');

    const prompt = `You are a strategic advisor who uses tarot as a framework for lateral thinking—NOT a mystical fortune teller.

The user is a professional facing this decision:
"${question}"

They drew these cards in a "${spread.name}" spread:

${cardsDescription}

Provide a strategic interpretation in 3-4 paragraphs:
1. Acknowledge the question and set context
2. Interpret each card position as it relates to their specific situation
3. Synthesize into actionable advice

CRITICAL RULES:
- Write like a McKinsey consultant, not a psychic
- Be direct and actionable
- Reference their specific question, not generic meanings
- If reversed, emphasize the shadow/warning aspect
- End with a clear recommendation or question for them to consider
- No mystical language—use business/strategic framing
- Keep it concise but insightful`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const interpretation = data.content?.[0]?.text || 'Could not generate interpretation.';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ interpretation: 'Error connecting to oracle.' }, { status: 500 });
  }
}
