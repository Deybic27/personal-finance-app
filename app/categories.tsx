import { CategoriesByType } from "@/components/database/categories-by-type";
import { ThemedPressable } from "@/components/themed-pressable";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";


export default function CategoriesScreen() {
    const params = useLocalSearchParams<{
        type?: 'income' | 'expense';
    }>();
    return (
        // <ParallaxScrollView
        //     headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        //     headerImage={
        //         <Image
        //         source={require('@/assets/images/partial-react-logo.png')}
        //         style={styles.reactLogo}
        //         />
        //     }>
        //     <ThemedView style={styles.containerFloat}>
        //         <ThemedPressable type="floatButton">
        //             <ThemedText type="button">+</ThemedText>
        //         </ThemedPressable>
        //     </ThemedView>
        //     <CategoriesByType type={String(params.type)} />    
        // </ParallaxScrollView>
        <ThemedView style={styles.container}>
            <CategoriesByType type={String(params.type)} />
            <ThemedPressable type="floatButton" onPress={() => router.push('/add-category')}>
                <ThemedText>+</ThemedText>
            </ThemedPressable>
        </ThemedView>
        
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
  container: {
    flex: 1,
  }
})