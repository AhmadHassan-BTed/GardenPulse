import os

# Target directory for the components
DIR_PATH = os.path.join("components", "common")

# Ensure the directory exists
os.makedirs(DIR_PATH, exist_ok=True)

# Dictionary containing the filename and its exact React Native code
components = {
    "ConfettiCelebration.tsx": """
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';

const ConfettiCelebration = () => {
  const { Colors } = useTheme();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, pointerEvents: 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 50 }}>
      <Text style={{ fontSize: 42 }}>🎉</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.green.DEFAULT, marginTop: 16 }}>All tasks done!</Text>
    </View>
  );
};

export default ConfettiCelebration;
""",

    "SwipeableRowMock.tsx": """
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const SwipeableRowMock = ({ children, onLog, onArchive }: any) => {
  const { Colors, Radius } = useTheme();
  const [swiped, setSwiped] = useState(false);
  
  return (
    <View style={{ position: 'relative', marginBottom: 12 }}>
      <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: Colors.surface.elevated, borderRadius: Radius.lg, overflow: 'hidden' }}>
        <Pressable onPress={onLog} style={{ width: 70, backgroundColor: Colors.green.DEFAULT, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name="edit-2" size={20} color="#FFF" />
        </Pressable>
        <Pressable onPress={onArchive} style={{ width: 70, backgroundColor: Colors.text.error, justifyContent: 'center', alignItems: 'center' }}>
          <Feather name="archive" size={20} color="#FFF" />
        </Pressable>
      </View>
      <Pressable onPress={() => setSwiped(!swiped)} style={{ transform: [{ translateX: swiped ? -140 : 0 }] }}>
        {children}
      </Pressable>
    </View>
  );
};

export default SwipeableRowMock;
""",

    "PlantHeroImage.tsx": """
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const PlantHeroImage = ({ imageUrl, photoCount, onAddPhoto }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ width: '100%', height: 250, position: 'relative', backgroundColor: Colors.surface.elevated, marginBottom: Spacing.md }}>
      <Image source={imageUrl ? { uri: imageUrl } : require('../../assets/placeholder-plant.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      <View style={{ position: 'absolute', bottom: Spacing.md, left: Spacing.md, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.full, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <Feather name="image" size={14} color="#FFF" />
        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{photoCount} Photos</Text>
      </View>
      <Pressable onPress={onAddPhoto} style={{ position: 'absolute', bottom: Spacing.md, right: Spacing.md, backgroundColor: Colors.green.DEFAULT, width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
        <Feather name="camera" size={20} color="#FFF" />
      </Pressable>
    </View>
  );
};

export default PlantHeroImage;
""",

    "VoiceInputButton.tsx": """
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const VoiceInputButton = () => {
  const { Colors } = useTheme();
  const [recording, setRecording] = useState(false);
  return (
    <Pressable onPress={() => setRecording(!recording)} style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: recording ? Colors.text.error : Colors.green.DEFAULT, justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
      <Feather name="mic" size={28} color="#FFF" />
      {recording && <View style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFF' }} />}
    </Pressable>
  );
};

export default VoiceInputButton;
""",

    "RecentlyUsedBanner.tsx": """
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomButton from './CustomButton';

const RecentlyUsedBanner = ({ toolName, icon, onOpen }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.sm, marginBottom: Spacing.md }}>
      <View style={{ backgroundColor: Colors.surface.base, padding: 8, borderRadius: Radius.sm }}>
        <Feather name={icon} size={16} color={Colors.text.heading} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, color: Colors.text.muted, textTransform: 'uppercase', fontWeight: 'bold' }}>Recently Used</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{toolName}</Text>
      </View>
      <CustomButton label="Open →" variant="ghost" onPress={onOpen} style={{ paddingHorizontal: 0 }} />
    </View>
  );
};

export default RecentlyUsedBanner;
""",

    "SunriseSunsetRow.tsx": """
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const SunriseSunsetRow = ({ sunrise, sunset }: any) => {
  const { Colors, Spacing, Radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surface.elevated, padding: Spacing.md, borderRadius: Radius.md, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Feather name="sunrise" size={20} color="#F59E0B" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{sunrise}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>{sunset}</Text>
        <Feather name="sunset" size={20} color="#8B5CF6" />
      </View>
    </View>
  );
};

export default SunriseSunsetRow;
""",

    "CustomReminderForm.tsx": """
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const CustomReminderForm = () => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ marginBottom: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.sm }}>New Custom Reminder</Text>
      <CustomInput label="Task Type (e.g. Turn lights off)" value="" onChangeText={() => {}} />
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm }}>
        <View style={{ flex: 1 }}><CustomInput label="Time" value="08:00 AM" onChangeText={() => {}} /></View>
        <View style={{ flex: 1 }}><CustomInput label="Repeat" value="Daily" onChangeText={() => {}} /></View>
      </View>
      <CustomButton label="Save Reminder" onPress={() => {}} style={{ marginTop: Spacing.md }} />
    </CustomCard>
  );
};

export default CustomReminderForm;
""",

    "MapLayerToggleSheet.tsx": """
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';

const MapLayerToggleSheet = () => {
  const { Colors, Spacing } = useTheme();
  const [active, setActive] = useState('success');
  return (
    <View style={{ padding: Spacing.md }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text.heading, marginBottom: Spacing.md }}>Map Layers</Text>
      <Pressable onPress={() => setActive('success')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Success Rates</Text>
        {active === 'success' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
      <Pressable onPress={() => setActive('growers')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: Colors.border.subtle }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Active Growers</Text>
        {active === 'growers' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
      <Pressable onPress={() => setActive('logs')} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
        <Text style={{ color: Colors.text.heading, fontSize: 14 }}>Recent Logs</Text>
        {active === 'logs' && <Feather name="check" size={16} color={Colors.green.DEFAULT} />}
      </Pressable>
    </View>
  );
};

export default MapLayerToggleSheet;
""",

    "PendingExportStatusCard.tsx": """
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomCard from './CustomCard';

const PendingExportStatusCard = () => {
  const { Colors, Spacing } = useTheme();
  return (
    <CustomCard padding={Spacing.md} style={{ backgroundColor: '#3B82F615', borderColor: '#3B82F640', borderWidth: 1, marginBottom: Spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 }}>
        <Feather name="loader" size={16} color="#3B82F6" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.text.heading }}>Preparing Export...</Text>
      </View>
      <Text style={{ fontSize: 12, color: Colors.text.body, lineHeight: 18 }}>Your data export is being generated. We will notify you when it's ready to download (usually within 24 hours).</Text>
    </CustomCard>
  );
};

export default PendingExportStatusCard;
""",

    "WatermarkToggleRow.tsx": """
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../layout/ThemeProvider';
import CustomSwitch from './CustomSwitch';

const WatermarkToggleRow = ({ isSupporter }: { isSupporter: boolean }) => {
  const { Colors, Spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderColor: Colors.border.subtle }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: isSupporter ? Colors.text.heading : Colors.text.muted }}>Include GardenPulse branding</Text>
          {!isSupporter && <Feather name="lock" size={12} color={Colors.text.muted} />}
        </View>
        <Text style={{ fontSize: 12, color: Colors.text.muted, marginTop: 2 }}>{isSupporter ? 'Toggle off to remove watermarks' : 'Supporter feature'}</Text>
      </View>
      <CustomSwitch value={true} onValueChange={() => {}} label="" isDisabled={!isSupporter} />
    </View>
  );
};

export default WatermarkToggleRow;
"""
}

# Write files
for filename, content in components.items():
    filepath = os.path.join(DIR_PATH, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {filepath}")

print("\n✨ All 10 final components created successfully! ✨")