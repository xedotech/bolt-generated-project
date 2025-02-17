import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate node discovery
  const nodes = [
    { id: 'node-1', latitude: 40.7128, longitude: -74.0060, location: 'New York' },
    { id: 'node-2', latitude: 34.0522, longitude: -118.2437, location: 'Los Angeles' },
    { id: 'node-3', latitude: 51.5074, longitude: 0.1278, location: 'London' },
    { id: 'node-4', latitude: 35.6895, longitude: 139.6917, location: 'Tokyo' },
  ];

  return NextResponse.json({ nodes });
}
