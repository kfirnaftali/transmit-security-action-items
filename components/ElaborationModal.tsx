import React from 'react';
import type { ActionItem } from '../types';

interface ElaborationModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ActionItem | null;
    elaboration: string;
    isLoading: boolean;
}

export const ElaborationModal: React.FC<ElaborationModalProps> = ({ isOpen, onClose, item, elaboration, isLoading }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Action Item Details</h3>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6 border-l-4 border-blue-500">
                    <p className="font-semibold text-gray-700">Action Item:</p>
                    <p className="text-gray-900 mt-1">{item?.description}</p>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                    <h4 className="font-semibold text-gray-700 mb-2">Elaboration:</h4>
                    {isLoading ? (
                        <div className="flex items-center gap-3 text-gray-600 py-4">
                             <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                            <span>Generating details based on session notes...</span>
                        </div>
                    ) : (
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{elaboration}</p>
                    )}
                </div>

                <div className="mt-8 flex justify-end border-t pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
