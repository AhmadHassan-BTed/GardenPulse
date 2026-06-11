import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomButton from './CustomButton';
import IconButton from './IconButton';

export const ClusterCoverHeader = ({ title, memberCount, location, onJoin }: any) => {
  const { Colors, Spacing, Radius, Typography } = useTheme();
  return (
    <View style={{ height: 200, borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: Colors.surface.elevated, marginBottom: Spacing.md }}>
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', padding: Spacing.lg, justifyContent: 'flex-end' }}>
        <Text style={{ color: '#FFF', fontSize: Typography.sizes.xl, fontWeight: 'bold', marginBottom: 4 }}>{title}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.sm, marginBottom: Spacing.sm }}>
          <Feather name="map-pin" size={12} /> {location} · {memberCount} Members
        </Text>
        <CustomButton label="Join Cluster" onPress={onJoin} style={{ alignSelf: 'flex-start', minHeight: 36, paddingVertical: 0 }} />
      </View>
    </View>
  );
};

export const MemberRow = ({ name, joinedDate, avatarUrl }: any) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
      <Image source={avatarUrl ? { uri: avatarUrl } : require('../../assets/placeholder-avatar.png')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface.elevated }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading }}>{name}</Text>
        <Text style={{ fontSize: Typography.sizes.xs, color: Colors.text.muted }}>Joined {joinedDate}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={Colors.text.muted} />
    </View>
  );
};

export const SwapCard = ({ itemName, type, location, onExpressInterest }: any) => {
  const { Colors, Spacing, Typography } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: Typography.sizes.base, fontWeight: 'bold', color: Colors.text.heading }}>{itemName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 4 }}>
          <Text style={{ fontSize: 10, color: Colors.green.DEFAULT, fontWeight: 'bold', textTransform: 'uppercase' }}>{type}</Text>
          <Text style={{ fontSize: 10, color: Colors.text.muted }}>· {location}</Text>
        </View>
      </View>
      <CustomButton label="Interest" onPress={onExpressInterest} style={{ minHeight: 32, paddingVertical: 0 }} />
    </CustomCard>
  );
};

export const CommentThread = () => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ marginTop: Spacing.sm }}>
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md }}>
        <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.surface.elevated }} />
        <View style={{ flex: 1, backgroundColor: Colors.surface.glass, padding: Spacing.sm, borderRadius: Radius.md }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.text.heading }}>PlantGuru</Text>
          <Text style={{ fontSize: 14, color: Colors.text.body, marginTop: 2 }}>Make sure to check the pH runoff!</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <TextInput placeholder="Add a comment..." placeholderTextColor={Colors.text.muted} style={{ flex: 1, backgroundColor: Colors.surface.elevated, height: 40, borderRadius: 20, paddingHorizontal: Spacing.md, color: Colors.text.heading }} />
        <IconButton 
          name="send" 
          size={20} 
          color={Colors.green.DEFAULT} 
          onPress={() => {
            Alert.alert('Comment Sent', 'Your comment has been posted to the thread!');
          }} 
        />
      </View>
    </View>
  );
};

export const FullScreenPhotoViewer = ({ onClose, onLog }: any) => {
  const { Spacing } = useTheme();
  return (
    <View style={{ height: 400, backgroundColor: '#000', borderRadius: 16, overflow: 'hidden', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#555' }}>[Full Screen Photo Placeholder]</Text>
      <View style={{ position: 'absolute', top: Spacing.md, right: Spacing.md }}><IconButton name="x" size={24} color="#FFF" onPress={onClose} /></View>
      <View style={{ position: 'absolute', bottom: Spacing.lg, left: Spacing.lg, right: Spacing.lg }}>
        <CustomButton label="Log this plant →" onPress={onLog} />
      </View>
    </View>
  );
};