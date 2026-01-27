import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedSectionTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'button' | 'date';
};

export function ThemedSectionText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedSectionTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textSection');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'date' ? styles.date : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    paddingBottom: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  button: {
    lineHeight: 30,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});
