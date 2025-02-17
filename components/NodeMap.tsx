"use client";

import React from 'react';

interface NodeMapProps {
  nodes: { id: string; latitude: number; longitude: number; location: string }[];
}

export const NodeMap: React.FC<NodeMapProps> = ({ nodes }) => {
  return (
    <div className="w-full h-64 bg-gray-100 rounded-md relative overflow-hidden">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{
            left: `${((node.longitude + 180) / 360) * 100}%`,
            top: `${((90 - node.latitude) / 180) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="absolute top-4 left-4 text-xs text-gray-700">{node.location}</span>
        </div>
      ))}
    </div>
  );
};
