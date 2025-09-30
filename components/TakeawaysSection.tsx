
import React from 'react';
import { TakeawayCard } from './TakeawayCard';

const StateGrowthIcon = () => (
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
       <path d="M 5,45 Q 25,40 50,20 T 95,5" stroke="currentColor" strokeWidth="2" fill="none" />
       <text x="50" y="48" fontSize="4" textAnchor="middle">Time</text>
       <text x="3" y="25" fontSize="4" transform="rotate(-90 3,25)">State Size</text>
    </svg>
);

const ArchitectureIcon = () => (
   <svg viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg" fontSize="5">
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="black"/></marker></defs>
      <rect x="5" y="25" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="17.5" y="33" textAnchor="middle">Events</text>
      <rect x="50" y="25" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="62.5" y="33" textAnchor="middle">STA</text>
       <rect x="50" y="5" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="62.5" y="13" textAnchor="middle">LTA</text>
      <rect x="95" y="25" width="30" height="15" fill="#dbeafe" stroke="#1d4ed8" rx="2"/>
      <text x="110" y="33" textAnchor="middle">Detection</text>
      <path d="M 30 32.5 L 50 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)"/>
      <path d="M 62.5 25 V 20 H 37.5 V 32.5" fill="none" stroke="black" strokeWidth="0.5"/>
       <path d="M 75 12.5 L 100 12.5 L 100 25" fill="none" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)"/>
       <path d="M 75 32.5 L 95 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)"/>
   </svg>
);

const WatermarkIcon = () => (
   <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
     <line x1="5" y1="25" x2="95" y2="25" stroke="black" strokeWidth="0.5"/>
     <text x="50" y="48" fontSize="4" textAnchor="middle">Event Time</text>
     <rect x="20" y="20" width="30" height="10" fill="rgba(34, 197, 94, 0.2)" stroke="#16a34a" strokeDasharray="2"/>
     <text x="35" y="18" fontSize="4" textAnchor="middle">Window</text>
     <circle cx="25" cy="25" r="2" fill="#3b82f6"/>
     <circle cx="35" cy="25" r="2" fill="#3b82f6"/>
     <circle cx="58" cy="25" r="2" fill="#ef4444"/>
     <text x="58" y="33" fontSize="3" textAnchor="middle">Late Data</text>
     <line x1="50" y1="15" x2="50" y2="35" stroke="#a855f7" strokeWidth="1" strokeDasharray="2"/>
     <text x="50" y="13" fontSize="4" textAnchor="middle" fill="#a855f7">Watermark</text>
   </svg>
);

export const TakeawaysSection: React.FC = () => {
    return (
        <section id="takeaways" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 border-b pb-2 mb-6">Key Takeaways & Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TakeawayCard 
                    title="Challenge: Unbounded State Growth"
                    borderColor="border-red-500"
                    textColor="text-red-700"
                    svg={<StateGrowthIcon />}
                >
                    A core issue identified is the ever-expanding state in our Dataflow jobs, leading to performance degradation. The proposed solution is a new service to offload short-term aggregations.
                </TakeawayCard>
                <TakeawayCard 
                    title="New Architecture: STA Service"
                    borderColor="border-blue-500"
                    textColor="text-blue-700"
                    svg={<ArchitectureIcon />}
                >
                    The proposed Short-Term Aggregation (STA) service will use Redis for real-time state management, providing fresh data to the detection service in parallel with our long-term pipeline.
                </TakeawayCard>
                <TakeawayCard 
                    title="Concept: Watermarks & Windowing"
                    borderColor="border-green-500"
                    textColor="text-green-700"
                    svg={<WatermarkIcon />}
                >
                    We reviewed how Dataflow uses watermarks, windowing, and triggers to correctly process out-of-order data, ensuring the accuracy of our time-based aggregations.
                </TakeawayCard>
            </div>
        </section>
    );
};
