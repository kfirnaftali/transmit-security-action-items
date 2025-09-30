import React, { useState, useMemo } from 'react';
import { ActionItem, Priority, Status } from '../types';
import { STATUS_OPTIONS } from '../constants';

interface ActionItemsTableProps {
    items: ActionItem[];
    onChange: (id: number, field: 'owner' | 'status' | 'notes', value: string) => void;
    onAddItemClick: () => void;
    onElaborateClick: (item: ActionItem) => void;
}

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
    switch (priority) {
        case Priority.HIGH:
            return <span className={`${baseClasses} bg-red-100 text-red-800`}>High</span>;
        case Priority.MEDIUM:
            return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Medium</span>;
        case Priority.LOW:
            return <span className={`${baseClasses} bg-green-100 text-green-800`}>Low</span>;
        default:
            return null;
    }
};

export const ActionItemsTable: React.FC<ActionItemsTableProps> = ({ items, onChange, onAddItemClick, onElaborateClick }) => {
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const priorityMatch = priorityFilter === 'all' || item.priority.toLowerCase() === priorityFilter;
            const statusMatch = statusFilter === 'all' || item.status === statusFilter;
            return priorityMatch && statusMatch;
        });
    }, [items, priorityFilter, statusFilter]);

    return (
        <section id="action-items" className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-between items-center border-b pb-2 mb-4 gap-4">
                <h2 className="text-2xl font-bold text-gray-700">Action Items Tracker</h2>
                <button
                    onClick={onAddItemClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                    + Add Action Item
                </button>
            </div>

            <div className="filters flex flex-wrap gap-4 items-center mb-4 bg-gray-50 p-4 rounded-lg">
                <div>
                    <label htmlFor="filter-priority" className="font-semibold mr-2">Filter by Priority:</label>
                    <select 
                        id="filter-priority" 
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="rounded-md border-gray-600 bg-black text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="filter-status" className="font-semibold mr-2">Filter by Status:</label>
                    <select 
                        id="filter-status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-md border-gray-600 bg-black text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="all">All</option>
                        {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table id="action-items-table" className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-1/12">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-4/12">Action Item</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-2/12">Owner</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-2/12">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-3/12">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={item.priority} /></td>
                                <td 
                                    className="px-6 py-4 text-sm cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                                    onClick={() => onElaborateClick(item)}
                                    title="Click to see details"
                                >
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    <input 
                                        type="text" 
                                        placeholder="Assign owner..." 
                                        value={item.owner}
                                        onChange={(e) => onChange(item.id, 'owner', e.target.value)}
                                        className="w-full rounded-md border-gray-600 bg-black text-white shadow-sm text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={item.status}
                                        onChange={(e) => onChange(item.id, 'status', e.target.value)}
                                        className="w-full rounded-md border-gray-600 bg-black text-white shadow-sm text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <textarea 
                                        placeholder="Add updates..." 
                                        value={item.notes}
                                        onChange={(e) => onChange(item.id, 'notes', e.target.value)}
                                        className="w-full rounded-md border-gray-600 bg-black text-white shadow-sm text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                        rows={2}
                                    ></textarea>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredItems.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p>No action items match the current filters.</p>
                    </div>
                )}
            </div>
        </section>
    );
};