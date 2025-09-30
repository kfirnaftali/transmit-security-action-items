import React, { useState } from 'react';
import type { ActionItem, Status } from './types';
import { ACTION_ITEMS } from './constants';
import { TakeawaysSection } from './components/TakeawaysSection';
import { ActionItemsTable } from './components/ActionItemsTable';
import { AddActionItemModal } from './components/AddActionItemModal';
import { ElaborationModal } from './components/ElaborationModal';

const App: React.FC = () => {
    const [actionItems, setActionItems] = useState<ActionItem[]>(ACTION_ITEMS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // State for the elaboration modal
    const [isElaborationModalOpen, setIsElaborationModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ActionItem | null>(null);
    const [elaboration, setElaboration] = useState('');
    const [isLoadingElaboration, setIsLoadingElaboration] = useState(false);
    
    const handleActionItemChange = (id: number, field: 'owner' | 'status' | 'notes', value: string) => {
        setActionItems(prevItems =>
            prevItems.map(item => {
                if (item.id !== id) {
                    return item;
                }
                if (field === 'status') {
                    return { ...item, status: value as Status };
                }
                return { ...item, [field]: value };
            })
        );
    };

    const handleAddItem = (newItem: Omit<ActionItem, 'id'>) => {
        const newId = actionItems.length > 0 ? Math.max(...actionItems.map(item => item.id)) + 1 : 1;
        setActionItems(prevItems => [...prevItems, { id: newId, ...newItem }]);
    };
    
    const handleElaborateClick = async (item: ActionItem) => {
        setSelectedItem(item);
        setIsElaborationModalOpen(true);
        setIsLoadingElaboration(true);
        setElaboration('');

        const knowledgeBase = `
            Session Summary: The 3-day session focused on optimizing Dataflow usage. Key topics included:
            - Deployment improvements using Flex Templates over Config Connector for CI/CD.
            - Performance and cost efficiency.
            - A new "Short-Term Aggregation (STA) service" architecture to handle unbounded state growth, using Redis for real-time state management. This service runs in parallel with the long-term pipeline to provide fresh data to the detection service.
            - Dataflow best practices for handling late data using watermarks, windowing, and triggers.
            - Upgrading Python versions in jobs from 3.8 to a more recent, supported version.
            - Optimizing worker image sizes to reduce startup times.
            - Following up on support cases for data freshness metrics.
        `;

        const prompt = `
            Based on the following session summary, please elaborate on the action item below. Provide a detailed explanation of what needs to be done, why it's important, and what the discussion was likely about. Format the response clearly.

            **Session Summary:**
            ${knowledgeBase}

            **Action Item:**
            "${item.description}"

            **Elaboration:**
        `;
        
        const API_KEY = process.env.API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt,
                        }],
                    }],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                throw new Error(`API request failed: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (generatedText) {
                setElaboration(generatedText);
            } else {
                console.error("Unexpected API response structure:", data);
                setElaboration("The response from the AI was empty or in an unexpected format.");
            }

        } catch (error) {
            console.error("Error generating elaboration:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setElaboration(`Sorry, an error occurred while generating details for this item: ${errorMessage}`);
        } finally {
            setIsLoadingElaboration(false);
        }
    };

    const closeElaborationModal = () => {
        setIsElaborationModalOpen(false);
        setSelectedItem(null);
        setElaboration('');
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl">
            <header className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Transmit Security & PSO Dataflow Session</h1>
                <p className="text-xl text-gray-600 mt-2">Summary & Action Plan</p>
            </header>

            <section id="summary" className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-gray-700 border-b pb-2 mb-4">Session Summary</h2>
                <p className="text-lg leading-relaxed">The 3-day session covered a wide range of topics related to optimizing our use of Dataflow. Key discussions focused on improving job deployment with Flex Templates, enhancing performance and cost-efficiency, redesigning our architecture with a new <strong className="text-blue-600">Short-Term Aggregation (STA) service</strong> to handle state growth, and deep dives into Dataflow best practices for handling late data and ensuring data integrity.</p>
            </section>

            <TakeawaysSection />

            <ActionItemsTable 
                items={actionItems} 
                onChange={handleActionItemChange}
                onAddItemClick={() => setIsAddModalOpen(true)}
                onElaborateClick={handleElaborateClick}
            />

            <AddActionItemModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddItem}
            />

            <ElaborationModal
                isOpen={isElaborationModalOpen}
                onClose={closeElaborationModal}
                item={selectedItem}
                elaboration={elaboration}
                isLoading={isLoadingElaboration}
            />
        </div>
    );
};

export default App;