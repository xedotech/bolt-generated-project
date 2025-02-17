import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nodeId } = await request.json();

    // Simulate starting mining
    console.log(`Mining started for node: ${nodeId}`);

    return NextResponse.json({ success: true, message: 'Mining started successfully.' });
  } catch (error) {
    console.error("Error starting mining:", error);
    return NextResponse.json({ success: false, error: 'Failed to start mining.' });
  }
}
