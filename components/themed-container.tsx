import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedContainer({ style, lightColor, darkColor, ...otherProps }: ThemedContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style, styles.container]} {...otherProps} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});