import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  return new Response('hello from netlify function', { status: 200 });
}

export const config = {
    path: "/api/hello"
};