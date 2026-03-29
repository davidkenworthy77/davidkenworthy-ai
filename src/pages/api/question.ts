export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Simple in-memory rate limit (per serverless instance)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  submissions.set(ip, times);
  if (times.length >= RATE_LIMIT) return true;
  times.push(now);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const data = await request.json();
    const { name, question, website, ts } = data;

    // Honeypot check - bots fill hidden fields
    if (website) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Timestamp check - reject if submitted too fast (under 3 seconds)
    if (ts) {
      const elapsed = Date.now() - parseInt(ts, 10);
      if (elapsed < 3000) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
    }

    // Rate limit by IP
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Try again later.' }),
        { status: 429 }
      );
    }

    if (!question || question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400 }
      );
    }

    // Reject suspiciously long messages
    if (question.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Message too long' }),
        { status: 400 }
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'dk.ai <noreply@davidkenworthy.ai>',
      to: 'davidkenworthy77@gmail.com',
      subject: `New message from ${name || 'Anonymous'} on dk.ai`,
      text: `Name: ${name || 'Anonymous'}\n\nMessage:\n${question}`,
      html: `
        <h2>New message on dk.ai</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'}</p>
        <hr />
        <p>${question.replace(/\n/g, '<br />')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Failed to send message:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      { status: 500 }
    );
  }
};
