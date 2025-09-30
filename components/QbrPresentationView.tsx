import React from 'react';

// Icon components for visual clarity
const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon = () => (
    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ArrowRightIcon = () => (
     <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);


// Architecture Diagrams
const OldArchitectureDiagram = () => (
   <svg viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg" fontSize="5">
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="black"/></marker></defs>
      <rect x="5" y="25" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="17.5" y="33" textAnchor="middle">Events</text>
      <rect x="50" y="25" width="45" height="15" fill="#fee2e2" stroke="#ef4444" rx="2"/>
      <text x="72.5" y="33" textAnchor="middle">Dataflow (LTA)</text>
      <rect x="115" y="25" width="30" height="15" fill="#dbeafe" stroke="#1d4ed8" rx="2"/>
      <text x="130" y="33" textAnchor="middle">Detection</text>
      <path d="M 30 32.5 L 50 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)"/>
      <path d="M 95 32.5 L 115 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)"/>
   </svg>
);

const NewArchitectureDiagram = () => (
   <svg viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg" fontSize="5">
      <defs><marker id="arrow-new" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="black"/></marker></defs>
      <rect x="5" y="25" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="17.5" y="33" textAnchor="middle">Events</text>
      <rect x="50" y="25" width="25" height="15" fill="#dcfce7" stroke="#22c55e" rx="2"/>
      <text x="62.5" y="33" textAnchor="middle">STA</text>
       <rect x="50" y="5" width="25" height="15" fill="#e0f2fe" stroke="#3b82f6" rx="2"/>
      <text x="62.5" y="13" textAnchor="middle">LTA</text>
      <rect x="95" y="25" width="30" height="15" fill="#dbeafe" stroke="#1d4ed8" rx="2"/>
      <text x="110" y="33" textAnchor="middle">Detection</text>
      <path d="M 30 32.5 L 50 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow-new)"/>
      <path d="M 30 32.5 L 40 32.5 L 62.5 20 L 62.5 20" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow-new)" fill="none" />
       <path d="M 75 12.5 L 100 12.5 L 100 25" fill="none" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow-new)"/>
       <path d="M 75 32.5 L 95 32.5" stroke="black" strokeWidth="0.5" markerEnd="url(#arrow-new)"/>
   </svg>
);


const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <section className="bg-white p-6 md:p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-3 mb-6">{title}</h2>
        {children}
    </section>
);

export const QbrPresentationView: React.FC = () => {
    return (
        <div className="px-4 py-6 sm:px-0 space-y-12 animate-fadeIn">
            
            <Section title="Engagement Goals">
                <p className="text-lg text-gray-600">Recap of the primary objectives for our 3-day deep-dive session.</p>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Address unbounded state growth and performance degradation.</span></li>
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Redesign the architecture for scalability and real-time processing.</span></li>
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Improve CI/CD practices and reduce deployment friction.</span></li>
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Establish Dataflow best practices for data integrity and cost optimization.</span></li>
                </ul>
            </Section>

            <Section title="Key Accomplishments">
                 <p className="text-lg text-gray-600">Successfully identified core issues and defined a clear, actionable path forward.</p>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Designed a new, robust architecture featuring a Short-Term Aggregation (STA) service.</span></li>
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Created a detailed, prioritized list of action items for immediate implementation.</span></li>
                     <li className="flex items-start gap-3"><CheckIcon /> <span>Aligned on best practices for handling late data with watermarks and triggers.</span></li>
                    <li className="flex items-start gap-3"><CheckIcon /> <span>Developed a strategic roadmap for phased rollout and continuous improvement.</span></li>
                </ul>
            </Section>

            <Section title="Deep Dive: Architectural Evolution">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Before */}
                    <div className="border p-4 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-xl text-center mb-2 text-red-600">Before: Single Pipeline</h3>
                        <div className="h-[150px] flex justify-center items-center"><OldArchitectureDiagram /></div>
                        <h4 className="font-semibold mt-4 mb-2">Pain Points:</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm"><CrossIcon /><span>Unbounded state growth led to performance degradation.</span></li>
                            <li className="flex items-start gap-2 text-sm"><CrossIcon /><span>Frequent snapshot failures and slow job startup times.</span></li>
                             <li className="flex items-start gap-2 text-sm"><CrossIcon /><span>Inability to provide fresh, real-time data efficiently.</span></li>
                        </ul>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex justify-center items-center">
                       <ArrowRightIcon />
                    </div>

                     {/* After */}
                    <div className="border p-4 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-xl text-center mb-2 text-green-600">After: Dual Pipeline with STA</h3>
                        <div className="h-[150px] flex justify-center items-center"><NewArchitectureDiagram /></div>
                         <h4 className="font-semibold mt-4 mb-2">Benefits:</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm"><CheckIcon /><span>Real-time state managed in Redis for high performance.</span></li>
                            <li className="flex items-start gap-2 text-sm"><CheckIcon /><span>Long-term state remains in Dataflow, separating concerns.</span></li>
                            <li className="flex items-start gap-2 text-sm"><CheckIcon /><span>Scalable, resilient, and provides fresher data to services.</span></li>
                        </ul>
                    </div>
                </div>
            </Section>
            
            <Section title="Roadmap: Phased Implementation">
                 <p className="text-lg text-gray-600 mb-6">Our strategic plan to roll out these improvements methodically.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Phase 1 */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-lg text-blue-800">Phase 1: Immediate Focus</h3>
                        <p className="text-sm text-blue-600 mb-3">(This Quarter)</p>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                           <li>Transition from Config Connector to Flex Templates.</li>
                           <li>Begin gradual rollout of the new STA service.</li>
                           <li>Upgrade Python version in Dataflow jobs.</li>
                           <li>Follow up on data freshness support case.</li>
                        </ul>
                    </div>
                     {/* Phase 2 */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">Phase 2: Optimization</h3>
                        <p className="text-sm text-gray-500 mb-3">(Next Quarter)</p>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                           <li>Optimize worker image size for faster startups.</li>
                           <li>Implement configurable "late data allowance".</li>
                           <li>Begin performance benchmarking of the STA service.</li>
                        </ul>
                    </div>
                     {/* Phase 3 */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">Phase 3: Future Enhancements</h3>
                         <p className="text-sm text-gray-500 mb-3">(Future)</p>
                         <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                           <li>Share STA architecture with other teams.</li>
                           <li>Explore advanced cost-optimization techniques.</li>
                           <li>Full migration to the new architecture.</li>
                        </ul>
                    </div>
                </div>
            </Section>
        </div>
    );
};

// Add a simple fade-in animation for the whole view
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);
