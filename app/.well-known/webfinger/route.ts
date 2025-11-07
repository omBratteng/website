import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const resource = url.searchParams.get('resource');
  const rel = url.searchParams.get('rel') || 'http://openid.net/specs/connect/1.0/issuer';

  if (!resource) {
    return NextResponse.json({ error: 'missing resource' }, { status: 400 })
  }

  const body = {
    subject: resource,
    links: [
      {
        rel: rel,
        href: 'https://sso.bratteng.com',
      },
    ],
  }

  return NextResponse.json(body, {
    status: 200,
    headers: { 'Content-Type': 'application/jrd+json; charset=utf-8' },
  })
}
