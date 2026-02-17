type SelectOption = {
    label: string;
    value: string;
};

type SelectInputProps = {
    label: string;
    name: string;
    value: string;
    options: SelectOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({ label, name, value, options, onChange }: SelectInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
                {label}
            </label>
            <select name={name} value={value} onChange={onChange} className="w-full rounded-xl border px-4 py-2.5 text-sm border-secondary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-base/20 focus:border-primary-base">
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
