import { getCategoryByName, insertCategory } from "@/database/db";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import ParallaxScrollView from "../parallax-scroll-view";
import { ThemedPressable } from "../themed-pressable";
import { ThemedRadioGroup } from "../themed-radio-group";
import { ThemedSelectColor } from "../themed-select-color";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

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

        router.back();
    }

    return (
        <ParallaxScrollView
              headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
              headerImage={
                <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  style={styles.reactLogo}
                />
              }>

            <ThemedView>
                <ThemedText type="title">Agregar categoría</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText style={{ marginBottom: 12 }} type="subtitle">Nombre de la categoría</ThemedText>
                <ThemedTextInput value={name} onChangeText={setName} type="default" placeholder="Ej: Comida" />
            </ThemedView>
            <ThemedView>
                <ThemedRadioGroup
                    value={type}
                    onChange={setType}
                    options={[
                        { label: 'Ingreso', value: 'income' },
                        { label: 'Gasto', value: 'expense' },
                    ]}
                />
            </ThemedView>
            <ThemedView>
                <ThemedText type="subtitle">Color</ThemedText>
                <ThemedSelectColor
                    options={[
                        { color: 'red' },
                        { color: 'green' },
                        { color: 'blue' },
                    ]}
                    value={color}
                    onChange={setColor}
                />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedPressable type="button" onPress={handleSubmit}>
                    <ThemedText type="button">Guardar categoría</ThemedText>
                </ThemedPressable>
            </ThemedView>
        </ParallaxScrollView>
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