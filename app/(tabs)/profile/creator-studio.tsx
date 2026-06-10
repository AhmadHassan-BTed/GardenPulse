import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../components/layout/ThemeProvider';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import CustomHeader from '../../../components/common/CustomHeader';
import { PublishedGuideCard, RevenueBanner } from '../../../components/common/PremiumGuides';
import RichTextEditor from '../../../components/common/RichTextEditor';
import { SettingsSectionGroup } from '../../../components/common/SettingsSectionGroup';
import CustomSwitch from '../../../components/common/CustomSwitch';
import CustomButton from '../../../components/common/CustomButton';
import SectionHeader from '../../../components/common/SectionHeader';
import CustomText from '../../../components/common/CustomText';

const initialGuides = [
  { id: '1', title: 'Monstera Care: A Comprehensive Guide', status: 'Live', views: 1248, revenue: '12.48' },
  { id: '2', title: 'Hydroponic Dosing for Beginners', status: 'Live', views: 852, revenue: '8.52' },
  { id: '3', title: 'Fiddle Leaf Fig Propagation Time-lapse', status: 'Draft', views: 0, revenue: '0.00' },
];

export default function CreatorStudioScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { Colors, Spacing, Typography } = theme;

  const [guides, setGuides] = useState(initialGuides);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const [editorTitle, setEditorTitle] = useState('New Guide Draft');
  const [editorContent, setEditorContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGuide = (guide: typeof initialGuides[0]) => {
    setEditorTitle(guide.title);
    setEditorContent('This is a simulated guide content template for the creator studio editor.');
    setIsEditing(true);
  };

  const handlePublish = () => {
    if (editorTitle.trim() === '') return;
    const newGuide = {
      id: String(guides.length + 1),
      title: editorTitle,
      status: 'Live',
      views: 0,
      revenue: '0.00',
    };
    setGuides((prev) => [newGuide, ...prev]);
    setIsEditing(false);
    setEditorTitle('New Guide Draft');
    setEditorContent('');
  };

  return (
    <ScreenWrapper scrollable={true} withPadding={true}>
      <CustomHeader 
        title="Creator Studio" 
        showBack={true} 
        onBack={() => router.back()} 
      />

      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        <RevenueBanner onLearnMore={() => router.push('/modals/supporter-badge')} />

        {isEditing ? (
          <View style={{ gap: Spacing.md }}>
            <SectionHeader title="Editor Workspace" />
            <CustomText style={{ fontSize: Typography.sizes.sm, color: Colors.text.body, fontWeight: 'bold' }}>
              Drafting: {editorTitle}
            </CustomText>
            <RichTextEditor
              initialValue={editorContent}
              onChange={setEditorContent}
              onInsertTemplate={() => setEditorContent(prev => prev + '\n[Care Requirements Template]')}
              onInsertTip={() => setEditorContent(prev => prev + '\n💡 Grower Tip: Keep humidity above 55%.')}
            />
            <View style={{ flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.sm }}>
              <CustomButton 
                label="Save & Publish" 
                onPress={handlePublish} 
                style={{ flex: 1 }}
              />
              <CustomButton 
                label="Cancel" 
                variant="secondary"
                onPress={() => setIsEditing(false)} 
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ) : (
          <View style={{ gap: Spacing.md }}>
            <CustomButton 
              label="Create New Guide Draft" 
              onPress={() => setIsEditing(true)} 
            />
          </View>
        )}

        <SectionHeader title="My Published Content" style={{ marginTop: Spacing.md }} />
        <View style={{ gap: Spacing.xs }}>
          {guides.map((guide) => (
            <PublishedGuideCard
              key={guide.id}
              title={guide.title}
              status={guide.status}
              views={guide.views}
              revenue={guide.revenue}
              onEdit={() => handleEditGuide(guide)}
            />
          ))}
        </View>

        <SettingsSectionGroup title="Creator Preferences" style={{ marginTop: Spacing.md }}>
          <View style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
            <CustomSwitch 
              label="Engagement Notifications" 
              description="Notify when readers like or comment on guides"
              value={notifications} 
              onValueChange={setNotifications} 
            />
          </View>
          <View style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
            <CustomSwitch 
              label="Auto-Save Drafts" 
              description="Back up content periodically while writing"
              value={autoSave} 
              onValueChange={setAutoSave} 
            />
          </View>
        </SettingsSectionGroup>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});