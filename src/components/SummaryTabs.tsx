import { useState, useEffect } from "react";
import { SummariesResponse } from "@/api/client";

const SummaryTabs: React.FC<SummariesResponse> = ({ summaryData }) => {
    
    const ensureArray = (content: string[] | string | undefined): string[] => {
        if (!content) return [];
        if (Array.isArray(content)) return content;
        
        if (content.includes(',')) {
            return content.split(',').filter(item => item.trim().length > 0);
        }
        
        return [content];
    };

    const tabs = [
        { key: "left", label: "Left", content: ensureArray(summaryData?.summaries.left), background: "bg-left", text: "text-white" },
        { key: "center", label: "Center", content: ensureArray(summaryData?.summaries.center), background: "bg-white", text: "text-black" },
        { key: "right", label: "Right", content: ensureArray(summaryData?.summaries.right), background: "bg-right", text: "text-white" },
        { key: "biasComparison", label: "Bias Analysis", content: ensureArray(summaryData?.biasComparison), background: "bg-highlight", text: "text-primary-900" },
    ];

    const getFirstAvailableTab = () => tabs.find(tab => tab.content.length > 0)?.key || "left";
    const [activeTab, setActiveTab] = useState<string>(getFirstAvailableTab());

    useEffect(() => {
        setActiveTab(getFirstAvailableTab());
    }, [summaryData?.summaries]);

    return (
        <div className="">
            
            <div className="font-title flex bg-primary-100 rounded-xl">
                {tabs.map(({ key, label, content, background, text }) => (
                    <button
                        key={key}
                        onClick={() => content.length > 0 && setActiveTab(key)}
                        className={`flex-1 p-2 text-center text-xs m-2 ${
                            content.length > 0 ? "cursor-pointer hover:bg-gray-200" : "text-gray-400 cursor-not-allowed"
                        } ${activeTab === key && content.length > 0 ? `${background} ${text} font-semibold rounded-xl` : ""}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="font-display p-4">
                {tabs.find(tab => tab.key === activeTab)?.content.length ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {tabs.find(tab => tab.key === activeTab)?.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-primary-900">Not enough data available for analysis.</p>
                )}
            </div>
        </div>
    );
};

export default SummaryTabs;