import type { ReactNode } from "react";
import { Flex } from "../general/BaseComponents";

export interface Column<T> {
    header: string;
    accessor: (row: T) => ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    error?: { message: string } | null;
}

export function Table<T>({ data, columns, isLoading, onRowClick, emptyMessage = "No data found.", error }: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto border rounded-xl shadow-sm bg-white border-gray-100">
            {isLoading && <div className="p-8 text-center text-gray-500">Loading...</div>}
            {error && <p role="alert" className="p-6 text-red-700">{error.message}</p>}
            {!error && !isLoading && data.length === 0 && <div className="p-8 text-center text-gray-500">{emptyMessage}</div>}
            {!error && !isLoading && data.length > 0 && (
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={typeof row === 'object' && row !== null && 'id' in row ? String(row.id) : rowIndex}
                                tabIndex={onRowClick ? 0 : undefined}
                                onKeyDown={(event) => {
                                    if (event.target === event.currentTarget && onRowClick && (event.key === "Enter" || event.key === " ")) {
                                        event.preventDefault();
                                        onRowClick(row);
                                    }
                                }}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${col.className || ''}`}>
                                        {col.accessor(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
