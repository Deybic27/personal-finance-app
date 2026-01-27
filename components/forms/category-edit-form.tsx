import { deleteCategory, getCategory, getCategoryCountRecords, updateCategory } from "@/database/db";
import { getTransactionTypeName, getTransactionTypeTable, TransactionType } from "@/utils/transaction-type";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ThemedContainer } from "../themed-container";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedSectionText } from "../themed-section-text";
import { ThemedSelectColor } from "../themed-select-color";
import { ThemedTextInput } from "../themed-text-input";

type CategoryEditFormProps = {
    categoryId: number;
}

export function CategoryEditForm({
    categoryId
}: CategoryEditFormProps) {
    const [name, setName] = useState('');
    const [type, setType] = useState<TransactionType>();
    const [nameType, setNameType] = useState('')
    const [color, setColor] = useState('');

    useFocusEffect(
        useCallback(() => {
            const currentCategory = getCategory(categoryId)
            setName(String(currentCategory?.name));
            setType(currentCategory?.type);
            setColor(String(currentCategory?.color));
            if(currentCategory?.type) setNameType(getTransactionTypeName(currentCategory?.type))
        }, [])
    );

    function handleSubmit() {
        if (!name) {
        Alert.alert('Error', 'El nombre es obligatorio');
        return;
        }
        if (!type) {
        Alert.alert('Error', 'El tipo es obligatorio');
        return;
        }
        if (!color) {
        Alert.alert('Error', 'El color es obligatorio');
        return;
        }

        const exists = getCategory(categoryId);
        if(!exists) { 
            Alert.alert("Error", "Categoría no existe");
            return null;
        }

        updateCategory(
            categoryId,
            name,
            color
        );
        console.log("Update Category: ", categoryId, name, color);
        Alert.alert("Mensaje", "La categoría ha sido actualizada");
        
        router.back();
    }

    function handleDelete() {
        const exists = getCategory(categoryId);
        if(!exists) { 
            Alert.alert("Error", "La categoría no existe");
            return;
        }
        
        if (type) {
            const table = getTransactionTypeTable(type);
            const countRecords = getCategoryCountRecords(table, categoryId.toString());
            if(countRecords > 0) {
                Alert.alert("Error", `La categoría no se puede eliminar, tiene ${countRecords} registros asignados.`);
                return;
            }
            deleteCategory(categoryId)
            console.log("Delete Category: ", categoryId);
            Alert.alert("Mensaje", "La categoría ha sido eliminada");
    
            router.back();
        }

    }

    return (
        <ThemedContainer>
            <ThemedSectionContainer>
                <ThemedSection>
                    <ThemedSectionText type="title">Editar categoría</ThemedSectionText>
                </ThemedSection>
                <ThemedSection>
                    <ThemedSectionText style={{ marginBottom: 12 }} type="subtitle">Nombre</ThemedSectionText>
                    <ThemedTextInput value={name} onChangeText={setName} type="default" placeholder="Ej: Comida" />
                </ThemedSection>
                <ThemedSection>
                    <ThemedSectionText type="subtitle">Tipo</ThemedSectionText>
                    <ThemedSectionText>{nameType}</ThemedSectionText>
                </ThemedSection>
                <ThemedSection>
                    <ThemedSectionText type="subtitle">Color</ThemedSectionText>
                    <ThemedSelectColor
                        options={[
                            { color: 'red' },
                            { color: 'green' },
                            { color: 'blue' },
                        ]}
                        value={color}
                        onChange={setColor}
                    />
                </ThemedSection>
                <ThemedSection style={styles.stepContainer}>
                    <ThemedPressable type="button" onPress={handleSubmit}>
                        <ThemedSectionText type="button">Guardar</ThemedSectionText>
                    </ThemedPressable>
                    <ThemedPressable type="buttonDelete" onPress={handleDelete}>
                        <ThemedSectionText type="button">Eliminar</ThemedSectionText>
                    </ThemedPressable>
                </ThemedSection>
            </ThemedSectionContainer>
        </ThemedContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
        reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});