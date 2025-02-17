import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate wallet balance retrieval
  const balance = 1500;

  return NextResponse.json({ balance });
}
