import { getCategoriesByType } from "@/database/db";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedContainer } from "../themed-container";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedText } from "../themed-text";
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
        try {
          setCategories(getCategoriesByType(type));
        } catch(error) {
          console.error("Error loading categories by type", error);
          return;
        }
      }, [])
  );
  return (
      <ThemedContainer>
        <FlatList
          data={categories}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => {
            return(
              <ThemedSectionContainer>
                <ThemedPressable onPress={() => router.push({pathname: '/edit-category', params: {id: item.id}})}>
                  <ThemedSection>
                    <CategoryCard
                      color={item.color}
                      name={item.name}
                    />
                  </ThemedSection>
                </ThemedPressable>
              </ThemedSectionContainer>
            );
          }}
        />
        <ThemedPressable type="floatButton" onPress={() => router.push('/add-category')}>
            <ThemedText>+</ThemedText>
        </ThemedPressable>
      </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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