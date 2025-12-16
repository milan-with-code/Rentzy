import ScreenLayout from "@/components/layout/screen-layout";
import { Text, View } from "react-native";

export default function AddExpensesScreen() {

    const renderElement = () => {
        return (
            <View>
                <Text>Add Expenses</Text>
            </View>
        )
    }

    return (
        <ScreenLayout title="Add Expenses" headerBottom={renderElement()}>
            <Text>AddExpensesScreen</Text>
        </ScreenLayout>
    )
}
