import React, { useState } from 'react';
import { ActionItem, Priority, Status } from '../types';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../constants';

interface AddActionItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Omit<ActionItem, 'id'>) => void;
}

export const AddActionItemModal: React.FC<AddActionItemModalProps> = ({ isOpen, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
    const [owner, setOwner] = useState('');
    const [status, setStatus] = useState<Status>(Status.NOT_STARTED);
    const [notes, setNotes] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        if (!description.trim()) {
            // Basic validation
            return;
        }
        onSave({
            description,
            priority,
            owner,
            status,
            notes,
        });
        // Reset form and close
        setDescription('');
        setPriority(Priority.MEDIUM);
        setOwner('');
        setStatus(Status.NOT_STARTED);
        setNotes('');
        onClose();
    };

    const isSaveDisabled = !description.trim();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 sm:p-8" onClick={e => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Action Item</h3>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                // FIX: Updated form element styling to be consistent with the light theme.
                                className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={3}
                                required
                                aria-required="true"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as Priority)}
                                    // FIX: Updated form element styling to be consistent with the light theme.
                                    className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as Status)}
                                    // FIX: Updated form element styling to be consistent with the light theme.
                                    className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                            <input
                                type="text"
                                id="owner"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                                placeholder="Assign an owner..."
                                // FIX: Updated form element styling to be consistent with the light theme.
                                className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any relevant updates or notes..."
                                // FIX: Updated form element styling to be consistent with the light theme.
                                className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={2}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaveDisabled}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Save Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
