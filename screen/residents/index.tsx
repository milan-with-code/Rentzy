import ScreenLayout from "@/components/layout/screen-layout";
import NoFoundFile from "@/components/empty-state/no-found-file";
import Tabs from "@/components/ui/tabs";
import { useState } from "react";

const residentTabs = [
    "Active", "Pending", "Released"
]

export default function ResidentScreen() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <ScreenLayout title="Resident">
            <Tabs
                tabs={residentTabs}
                activeIndex={activeTab}
                onChange={setActiveTab}
                showCount={true}
                counts={[12, 4, 9]}
            />
            {activeTab === 0 && <NoFoundFile title="No Active Residents" />}
            {activeTab === 1 && <NoFoundFile title="No Pending Residents" />}
            {activeTab === 2 && <NoFoundFile title="No Released Residents" />}
        </ScreenLayout>
    )
}
