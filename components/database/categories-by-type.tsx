import { deleteCategory, getCategoriesByType } from "@/app/database/db";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type CategoriesByTypeProps = {
  type: string
}

export function CategoriesByType({type = 'income'}: CategoriesByTypeProps) {

  const [categories, setCategories] = useState(getCategoriesByType(type))

  function handleDelete(id: number) {
    deleteCategory(id)
    setCategories(getCategoriesByType(type))
  }

  return (
      <ThemedView style={[styles.container]}>
        {categories.map(category => {
          return(
            <ThemedView style={[styles.option]} key={category.id}>
              <ThemedView style={[styles.circle, {backgroundColor: category.color}]}/>
              <ThemedText style={[styles.name]}>{category.name}</ThemedText>
              <ThemedPressable type="button" style={[styles.button]} onPress={() => handleDelete(category.id)}>
                <ThemedText>Eliminar</ThemedText>
              </ThemedPressable>
            </ThemedView>
          );
        })}
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // borderColor: "#fff",
    // borderWidth: 1,
  },
  option: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#555',    
  },
  button: {
    display: 'flex',
  },
  name: {
    display: 'flex',
    flexGrow: 1,
  },
})