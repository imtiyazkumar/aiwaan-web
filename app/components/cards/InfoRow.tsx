import { Div } from "~/components/general/BaseComponents";

const InfoRow = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <Div className="flex items-center gap-3">
        <span className="text-primary-base">{icon}</span>
        <span className="font-medium">{label}:</span>
        <span className="text-secondary-600">{value}</span>
    </Div>
);

export default InfoRow;
