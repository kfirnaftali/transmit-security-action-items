import React, { useState, useCallback } from 'react';
import { ActionItem, Status } from '../types';
import { ACTION_ITEMS } from '../constants';
import { TakeawaysSection } from './TakeawaysSection';
import { ActionItemsTable } from './ActionItemsTable';
import { AddActionItemModal } from './AddActionItemModal';
import { ElaborationModal } from './ElaborationModal';
import { QbrPresentationView } from './QbrPresentationView';
import { generateElaboration } from '../gemini-service';

type ActiveTab = 'tracker' | 'qbr';

export const MainPage: React.FC = () => {
    const [actionItems, setActionItems] = useState<ActionItem[]>(ACTION_ITEMS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isElaborationModalOpen, setIsElaborationModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ActionItem | null>(null);
    const [elaboration, setElaboration] = useState('');
    const [isLoadingElaboration, setIsLoadingElaboration] = useState(false);
    const [activeTab, setActiveTab] = useState<ActiveTab>('tracker');

    const handleItemChange = useCallback((id: number, field: keyof ActionItem, value: string) => {
        setActionItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    if (field === 'status') {
                        return { ...item, status: value as Status };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    }, []);

    const handleSaveNewItem = useCallback((newItem: Omit<ActionItem, 'id'>) => {
        setActionItems(prevItems => [
            ...prevItems,
            { ...newItem, id: Date.now() } // Simple way to generate a unique ID
        ]);
    }, []);

    // FIX: Replaced direct fetch call to Gemini API with the SDK-based `generateElaboration` service function. This adheres to coding guidelines, encapsulates logic, and simplifies the component.
    const handleElaborateClick = useCallback(async (item: ActionItem) => {
        setSelectedItem(item);
        setIsElaborationModalOpen(true);
        setIsLoadingElaboration(true);
        setElaboration('');

        try {
            const text = await generateElaboration(item);
            setElaboration(text);

        } catch (error) {
            console.error("Error generating elaboration:", error);
            setElaboration("Sorry, there was an error getting details for this item.");
        } finally {
            setIsLoadingElaboration(false);
        }
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
                    {activeTab === 'tracker' ? (
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Transmit Security & PSO Dataflow Session</h1>
                            <p className="text-xl text-gray-600 mt-2">Summary & Action Plan</p>
                        </div>
                    ) : (
                        <div>
                             <h1 className="text-3xl font-bold text-gray-900">QBR - Dataflow Optimization Sync</h1>
                             <p className="text-gray-500 mt-1">A guided presentation of our engagement, progress, and roadmap.</p>
                        </div>
                    )}
                    <div className="mt-4 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('tracker')}
                                className={`${
                                    activeTab === 'tracker'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                                aria-current={activeTab === 'tracker' ? 'page' : undefined}
                            >
                                Action Items Tracker
                            </button>
                            <button
                                onClick={() => setActiveTab('qbr')}
                                className={`${
                                    activeTab === 'qbr'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                                aria-current={activeTab === 'qbr' ? 'page' : undefined}
                            >
                                QBR Presentation
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {activeTab === 'tracker' ? (
                    <div className="px-4 py-6 sm:px-0 space-y-8">
                        <TakeawaysSection />
                        <ActionItemsTable 
                            items={actionItems}
                            onChange={handleItemChange}
                            onAddItemClick={() => setIsAddModalOpen(true)}
                            onElaborateClick={handleElaborateClick}
                        />
                    </div>
                ) : (
                   <QbrPresentationView />
                )}
            </main>
            <AddActionItemModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveNewItem}
            />
            <ElaborationModal
                isOpen={isElaborationModalOpen}
                onClose={() => setIsElaborationModalOpen(false)}
                item={selectedItem}
                elaboration={elaboration}
                isLoading={isLoadingElaboration}
            />
        </div>
    );
};
