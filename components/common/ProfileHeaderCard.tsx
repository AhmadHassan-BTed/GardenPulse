import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import AvatarPicker from './AvatarPicker';
import TextLink from './TextLink';

export interface ProfileHeaderCardProps {
  name: string;
  growerTag: string;
  avatarUrl?: string;
  onEditProfile: () => void;
  onAvatarPress: () => void;
  style?: ViewStyle;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ name, growerTag, avatarUrl, onEditProfile, onAvatarPress, style }) => {
  const { Colors, Spacing, Typography, Radius } = useTheme();
  
  return (
    <CustomCard padding={Spacing.lg} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.lg }}>
        <AvatarPicker imageUrl={avatarUrl} onPress={onAvatarPress} size={72} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.text.heading }}>{name}</Text>
          <View style={{ backgroundColor: `${Colors.green.DEFAULT}20`, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm, marginTop: 4, marginBottom: Spacing.sm }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors.green.DEFAULT, textTransform: 'uppercase' }}>{growerTag}</Text>
          </View>
          <TextLink label="Edit Profile" onPress={onEditProfile} variant="muted" />
        </View>
      </View>
    </CustomCard>
  );
};
export default ProfileHeaderCard;