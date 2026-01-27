import { getCategoriesByType } from "@/database/db";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedView } from "../themed-view";
import { CategoryCard } from "../ui/category-card";

type CategoriesByTypeProps = {
  type: string
}

type Category = {
  id: number;
  name: string;
  color: string;
};

export function CategoriesByType({type = 'income'}: CategoriesByTypeProps) {

  const [categories, setCategories] = useState<Category[]>([])

  useFocusEffect(
      useCallback(() => {
          setCategories(getCategoriesByType(type));
      }, [])
  );

  // function handleDelete(id: number) {
  //   const exists = getCategory(id)
  //   if(!exists) { 
  //     Alert.alert("Error", "La categoria no existe");
  //     return;
  //   }
  //   deleteCategory(id)
  //   setCategories(getCategoriesByType(type))
  //   Alert.alert("Error", "La categoria ha sido eliminada");
  // }

  return (
      <ThemedView style={[styles.container]}>
        {/* {categories.map(category => {
          return(
            <ThemedView style={[styles.option]} key={category.id}>
              <ThemedView style={[styles.circle, {backgroundColor: category.color}]}/>
              <ThemedText style={[styles.name]}>{category.name}</ThemedText>
              <ThemedPressable type="button" style={[styles.button]} onPress={() => handleDelete(category.id)}>
                <ThemedText>Eliminar</ThemedText>
              </ThemedPressable>
            </ThemedView>
          );
        })} */}
        <FlatList
          data={categories}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => {
            return(
              <ThemedView style={[styles.sectionCard]}>
                <ThemedPressable onPress={() => router.push({pathname: '/edit-category', params: {id: item.id}})}>
                  <CategoryCard
                    color={item.color}
                    name={item.name}
                  />
                </ThemedPressable>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // flex: 1,
    // borderColor: "#fff",
    // borderWidth: 1,
  },
  sectionCard: {
      padding: 10,
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