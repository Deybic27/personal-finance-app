import { getCategoryByName, insertCategory } from "@/database/db";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ThemedContainer } from "../themed-container";
import { ThemedPressable } from "../themed-pressable";
import { ThemedRadioGroup } from "../themed-radio-group";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedSectionText } from "../themed-section-text";
import { ThemedSelectColor } from "../themed-select-color";
import { ThemedTextInput } from "../themed-text-input";

export function CategoryForm() {
    const [name, setName] = useState('');
    const [type, setType] = useState('income');
    const [color, setColor] = useState('red');

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

        if (getCategoryByName(name, type).length > 0) {
            Alert.alert('Error', 'La categoría ya existe');
            return;
        }

        insertCategory(
            name,
            type,
            color
        );
        console.log("Insert Category: ", name, type, color);
        Alert.alert("Mensaje", "La categoría ha sido creada");

        router.back();
    }

    return (
        <ThemedContainer>
            <ThemedSectionContainer>
                <ThemedSection>
                    <ThemedSectionText type="title">Agregar categoría</ThemedSectionText>
                </ThemedSection>
                <ThemedSection>
                    <ThemedSectionText style={{ marginBottom: 12 }} type="subtitle">Nombre</ThemedSectionText>
                    <ThemedTextInput value={name} onChangeText={setName} type="default" placeholder="Ej: Comida" />
                </ThemedSection>
                <ThemedSectionText type="subtitle">Tipo</ThemedSectionText>
                <ThemedSection>
                    <ThemedRadioGroup
                        value={type}
                        onChange={setType}
                        options={[
                            { label: 'Ingreso', value: 'income' },
                            { label: 'Gasto', value: 'expense' },
                        ]}
                    />
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
                </ThemedSection>
            </ThemedSectionContainer>
        </ThemedContainer>
    );
}

const styles = StyleSheet.create({
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