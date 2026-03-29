export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, question, topic, website } = data;

    // Honeypot check
    if (website) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (!question || question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
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
      from: 'dk.ai <onboarding@resend.dev>',
      to: 'davidkenworthy77@gmail.com',
      subject: `New question from ${name || 'Anonymous'} [${topic || 'other'}]`,
      text: `Name: ${name || 'Anonymous'}\nTopic: ${topic || 'other'}\n\nQuestion:\n${question}`,
      html: `
        <h2>New question on dk.ai</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Topic:</strong> ${topic || 'other'}</p>
        <hr />
        <p>${question.replace(/\n/g, '<br />')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Failed to send question:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send question' }),
      { status: 500 }
    );
  }
};
