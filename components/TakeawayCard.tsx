
import React from 'react';

interface TakeawayCardProps {
    title: string;
    borderColor: string;
    textColor: string;
    children: React.ReactNode;
    svg: React.ReactNode;
}

export const TakeawayCard: React.FC<TakeawayCardProps> = ({ title, borderColor, textColor, children, svg }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${borderColor} transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl flex flex-col`}>
            <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{title}</h3>
            <p className="flex-grow">{children}</p>
            <div className="mt-4 bg-gray-100 p-3 rounded flex justify-center items-center h-[150px]">
                <div className="w-full h-full">
                    {svg}
                </div>
            </div>
        </div>
    );
};
