import { useCallback, useMemo, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    FlatList,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import ScreenLayout from "@/components/layout/screen-layout";
import IconButton from "@/components/ui/icon-button";
import Input from "@/components/ui/text-input";
import WheelDatePickerField from "@/components/date-picker/wheel-date-picker-Field";

import ExpenseCard from "./components/expense-card";
import ExpenseCardSkeleton from "@/skeleton/expense-card-skeleton";
import DeleteExpenseModal from "./components/delete-expense-modal";
import EditExpenseModal from "./components/edit-expense-modal";

import { Fonts } from "@/constants/theme";
import { Expense } from "@/types/expenses";
import { useExpenseStore } from "@/store/useExpenseStore";
import TotalExpenseCardSkeleton from "@/skeleton/total-expense-card-skeleton";
import TotalExpenseCard from "./components/total-expense-card";
import { endOfDay, startOfDay } from "@/utils/time";
import { useDebounce } from "@/hooks/useDebounce.ts";

const SKELETON_DATA: Expense[] = Array.from({ length: 6 }).map((_, i) => ({
    _id: `skeleton-${i}`,
    name: "",
    category: "",
    amount: 0,
    expenseDate: "",
}));

export default function ExpensesScreen() {
    const animation = useRef(new Animated.Value(0)).current;

    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({
        fromDate: new Date(),
        toDate: new Date(),
    });

    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [deleteExpenseId, setDeleteExpenseId] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const {
        expenses,
        loading,
        fetchExpenses,
        deleteExpense,
        updateExpense,
    } = useExpenseStore();

    useFocusEffect(
        useCallback(() => {
            fetchExpenses({
                fromDate: startOfDay(date.fromDate),
                toDate: endOfDay(date.toDate),
                search: debouncedSearch,
            });
        }, [
            fetchExpenses,
            date.fromDate,
            date.toDate,
            debouncedSearch,
        ])
    );

    const menuStyle = useMemo(
        () => ({
            opacity: animation,
            transform: [
                {
                    translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                    }),
                },
            ],
        }),
        [animation]
    );

    const toggleMenu = () => {
        Animated.timing(animation, {
            toValue: menuOpen ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start();

        setMenuOpen((prev) => !prev);
    };

    const totalExpenses = useMemo(
        () => expenses.reduce((sum, exp) => sum + exp.amount, 0),
        [expenses]
    );

    const renderItem = useCallback(
        ({ item }: { item: Expense }) =>
            loading ? (
                <ExpenseCardSkeleton />
            ) : (
                <ExpenseCard
                    item={item}
                    onEdit={() => setSelectedExpense(item)}
                    onDelete={(id) => setDeleteExpenseId(id)}
                />
            ),
        [loading]
    );

    return (
        <ScreenLayout
            title="Expenses"
            headerBottom={
                loading ? (
                    <TotalExpenseCardSkeleton />
                ) : (
                    <TotalExpenseCard total={totalExpenses} />
                )
            }
        >
            <View style={styles.row}>
                <WheelDatePickerField
                    label="From Date"
                    value={date.fromDate}
                    onConfirm={(d) =>
                        setDate((p) => ({ ...p, fromDate: d }))
                    }
                    containerStyle={styles.col}
                />

                <WheelDatePickerField
                    label="To Date"
                    value={date.toDate}
                    onConfirm={(d) =>
                        setDate((p) => ({ ...p, toDate: d }))
                    }
                    containerStyle={styles.col}
                />
            </View>

            <Input
                variant="search"
                placeholder="Search expense by name"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={loading ? SKELETON_DATA : expenses}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!loading}
                initialNumToRender={6}
                windowSize={7}
                removeClippedSubviews={true}
            />

            {menuOpen && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleMenu}
                />
            )}

            <Animated.View
                style={[styles.menu, menuStyle]}
                pointerEvents={menuOpen ? "auto" : "none"}
            >
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        toggleMenu();
                        router.push("/expenses/add-expense");
                    }}
                >
                    <Text style={styles.menuText}>Add Expense</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.fab}>
                <IconButton
                    icon={menuOpen ? "X" : "Plus"}
                    size={20}
                    onPress={toggleMenu}
                    style={{ backgroundColor: "white" }}
                />
            </View>

            <DeleteExpenseModal
                visible={!!deleteExpenseId}
                onCancel={() => setDeleteExpenseId("")}
                onConfirm={async () => {
                    if (!deleteExpenseId) return;
                    await deleteExpense(deleteExpenseId);
                    setDeleteExpenseId("");
                }}
            />

            <EditExpenseModal
                visible={!!selectedExpense}
                expense={selectedExpense}
                onClose={() => setSelectedExpense(null)}
                onSubmit={async (data) => {
                    if (!selectedExpense) return;
                    await updateExpense(selectedExpense._id, data);
                    setSelectedExpense(null);
                }}
            />
        </ScreenLayout>
    );
}



const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
    },

    col: {
        flex: 1,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    menu: {
        position: "absolute",
        bottom: 70,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 4,
        paddingVertical: 8,
    },

    menuItem: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },

    menuText: {
        fontSize: 14,
        fontFamily: Fonts.serif,
        color: "#111",
        lineHeight: 20,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,

        backgroundColor: "#fff",
        borderRadius: 999,
        padding: 4,

    },
});
