import { useState } from "react";
import { Calculator, CheckCircle, IndianRupee } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import Title from "~/components/general/Title";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function SmartEstimator() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        area: "",
        type: "Residential",
        quality: "Premium",
        services: [] as string[]
    });
    const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

    const toggleService = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const calculateEstimate = () => {
        const area = parseFloat(formData.area);
        if (!area) return;

        let baseRate = 2000; // Standard Residential

        if (formData.type === "Commercial") baseRate = 2500;
        if (formData.type === "Renovation") baseRate = 1500;

        if (formData.quality === "Premium") baseRate *= 1.4;
        if (formData.quality === "Luxury") baseRate *= 2.0;

        // Add-ons
        if (formData.services.includes("Interior Design")) baseRate += 500;
        if (formData.services.includes("Landscape")) baseRate += 200;

        const totalMin = Math.round(area * baseRate);
        const totalMax = Math.round(totalMin * 1.15); // 15% buffer

        setEstimate({ min: totalMin, max: totalMax });
        setStep(2);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <FlexColumn className={`${wrapperBaseClass} py-12 px-4`}>
            <FlexColumn className="text-center gap-1 w-full mb-10">
                <Div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 rounded-full mb-4">
                        <Calculator size={14} className="text-white" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Cost Intelligence</span>
                    </div>
                    <Title title={"Smart"} subtitle={"Estimator"} />
                </Div>
                <p className="text-secondary-600 max-w-2xl mx-auto">
                    Get an instant, data-driven estimate for your construction or design project.
                    Our algorithm considers local rates, material quality, and project scope.
                </p>
            </FlexColumn>

            <div className="max-w-3xl mx-auto w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50">
                {step === 1 ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Area */}
                        <div>
                            <label className="block text-sm font-bold text-secondary-900 mb-2">Total Area (Sq. Ft)</label>
                            <input
                                type="number"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                placeholder="e.g. 2500"
                                className="w-full p-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all text-xl font-medium"
                            />
                        </div>

                        {/* Type & Quality Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-secondary-900 mb-3">Project Type</label>
                                <div className="space-y-2">
                                    {["Residential", "Commercial", "Renovation"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`w-full p-3 rounded-lg text-left text-sm font-medium transition-all flex justify-between items-center ${formData.type === t ? 'bg-emerald-50 border-emerald-500 text-emerald-700 border' : 'bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {t}
                                            {formData.type === t && <CheckCircle size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-secondary-900 mb-3">Build Quality</label>
                                <div className="space-y-2">
                                    {["Standard", "Premium", "Luxury"].map(q => (
                                        <button
                                            key={q}
                                            onClick={() => setFormData({ ...formData, quality: q })}
                                            className={`w-full p-3 rounded-lg text-left text-sm font-medium transition-all flex justify-between items-center ${formData.quality === q ? 'bg-emerald-50 border-emerald-500 text-emerald-700 border' : 'bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {q}
                                            {formData.quality === q && <CheckCircle size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <label className="block text-sm font-bold text-secondary-900 mb-3">Additional Services</label>
                            <div className="flex flex-wrap gap-3">
                                {["Architecture", "Interior Design", "Landscape", "Consultation"].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => toggleService(s)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.services.includes(s)
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="primary_filled"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 border-none"
                            height="large"
                            onClick={calculateEstimate}
                            disabled={!formData.area}
                        >
                            Calculate Estimate
                        </Button>
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                            <IndianRupee size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary-900 mb-2">Estimated Project Cost</h3>
                        <p className="text-gray-500 mb-8">Based on current market rates in Kashmir region</p>

                        <div className="bg-emerald-50 rounded-2xl p-8 mb-8">
                            <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 tracking-tight">
                                {formatCurrency(estimate!.min)}
                                <span className="text-2xl text-emerald-400 mx-2">-</span>
                                {formatCurrency(estimate!.max)}
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium text-emerald-800 opacity-80">
                                <span className="px-2 py-1 bg-white/50 rounded">{formData.type}</span>
                                <span className="px-2 py-1 bg-white/50 rounded">{formData.quality}</span>
                                <span className="px-2 py-1 bg-white/50 rounded">{formData.area} sqft</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-3 text-secondary-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                Recalculate
                            </button>
                            <Button
                                variant="primary_filled"
                                className="bg-secondary-900 border-none text-white"
                                onClick={() => alert("Consultation request sent! We will optimize this budget for you.")}
                            >
                                Get Detailed Quote
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </FlexColumn>
    );
}
