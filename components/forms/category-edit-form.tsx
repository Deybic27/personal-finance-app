import { deleteCategory, getCategory, getCategoryCountRecords, updateCategory } from "@/database/db";
import { getTransactionTypeName, getTransactionTypeTable, TransactionType } from "@/utils/transaction-type";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import ParallaxScrollView from "../parallax-scroll-view";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSelectColor } from "../themed-select-color";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

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
            Alert.alert("Error", "Categoria no existe");
            return null;
        }

        updateCategory(
            categoryId,
            name,
            color
        );
        console.log("Update Category: ", categoryId, name, color);
        Alert.alert("Mensaje", "La categoria ha sido actualizada");
        
        router.back();
    }

    function handleDelete() {
        const exists = getCategory(categoryId);
        if(!exists) { 
            Alert.alert("Error", "La categoria no existe");
            return;
        }
        
        if (type) {
            const table = getTransactionTypeTable(type);
            const countRecords = getCategoryCountRecords(table, categoryId.toString());
            if(countRecords > 0) {
                Alert.alert("Error", `La categoria no se puede eliminar, tiene ${countRecords} registros asignados.`);
                return;
            }
            deleteCategory(categoryId)
            console.log("Delete Category: ", categoryId);
            Alert.alert("Mensaje", "La categoria ha sido eliminada");
    
            router.back();
        }

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
                <ThemedText type="subtitle">Tipo:</ThemedText>
                <ThemedText>{nameType}</ThemedText>
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
                    <ThemedText type="button">Guardar</ThemedText>
                </ThemedPressable>
                <ThemedPressable type="buttonDelete" onPress={handleDelete}>
                    <ThemedText type="button">Eliminar</ThemedText>
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