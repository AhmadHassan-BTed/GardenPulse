import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

export interface CustomTextProps extends RNTextProps {
  /** Optional variant for predefined text styles */
  variant?: 'heading' | 'body' | 'muted' | 'error' | 'success' | 'warning' | 'purple' | 'gold' | 'info';
  /** Text font size using theme typography sizes */
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  /** Text weight using theme typography weights */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  variant = 'body',
  size,
  weight,
  ...props
}) => {
  const { Colors, Typography } = useTheme();

  const getStyleByVariant = (): TextStyle => {
    switch (variant) {
      case 'heading':
        return { color: Colors.text.heading, fontWeight: Typography.weights.bold };
      case 'muted':
        return { color: Colors.text.muted };
      case 'error':
        return { color: Colors.text.error };
      case 'success':
        return { color: Colors.success };
      case 'warning':
        return { color: Colors.warning };
      case 'purple':
        return { color: Colors.purple };
      case 'gold':
        return { color: Colors.gold };
      case 'info':
        return { color: Colors.info };
      case 'body':
      default:
        return { color: Colors.text.body };
    }
  };

  const textStyle: TextStyle = {
    ...getStyleByVariant(),
    fontSize: size ? Typography.sizes[size] : undefined,
    fontWeight: weight ? Typography.weights[weight] : undefined,
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default CustomText;
