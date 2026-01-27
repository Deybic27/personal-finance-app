import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedSectionProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSection({ style, lightColor, darkColor, ...otherProps }: ThemedSectionProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSection');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
