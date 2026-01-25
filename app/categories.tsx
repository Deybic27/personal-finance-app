import { CategoriesByType } from "@/components/database/categories-by-type";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";


export default function CategoriesScreen() {
    const params = useLocalSearchParams<{
        type?: 'income' | 'expense';
    }>();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
                />
            }>
            <CategoriesByType type={String(params.type)} />    
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
  }
})