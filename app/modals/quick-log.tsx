import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Picker } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const careTypes = [
  { id: "watering", label: "Watering", icon: "drop.fill", color: "#4CAF50" },
  { id: "fertilizing", label: "Fertilizing", icon: "leaf.fill", color: "#8BC34A" },
  { id: "mist", label: "Misting", icon: "cloud.fill", color: "#2196F3" },
  { id: "rotate", label: "Rotation", icon: "rotate.right.fill", color: "#FF9800" },
  { id: "prune", label: "Pruning", icon: "scissors", color: "#9C27B0" },
  { id: "repot", label: "Repotting", icon: "cube.fill", color: "#795548" },
  { id: "check", label: "Health Check", icon: "eye.fill", color: "#607D8B" },
  { id: "harvest", label: "Harvest", icon: "basket.fill", color: "#4CAF50" },
];

const plants = [
  { id: "1", name: "Monstera Deliciosa", avatar: "🌿" },
  { id: "2", name: "Snake Plant", avatar: "🌱" },
  { id: "3", name: "Golden Pothos", avatar: "🌿" },
  { id: "4", name: "ZZ Plant", avatar: "🌿" },
  { id: "5", name: "Fiddle Leaf Fig", avatar: "🌳" },
  { id: "6", name: "Spider Plant", avatar: "🌱" },
];

export default function QuickLogScreen() {
  const router = useRouter();
  const { task } = useLocalSearchParams<{ task?: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedPlant, setSelectedPlant] = useState(plants[0].id);
  const [selectedCare, setSelectedCare] = useState("watering");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("ml");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const careType = careTypes.find(c => c.id === selectedCare);
  const plant = plants.find(p => p.id === selectedPlant);

  const handleSave = useCallback(() => {
    // Save logic here
    router.back();
  }, [router]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Image source={{ uri: "sf:xmark" }} style={styles.closeIcon} />
        </Pressable>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Quick Log</Text>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      {/* Plant Selector */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plantSelector}>
          {plants.map((p) => (
            <Pressable
              key={p.id}
              style={[
                styles.plantOption,
                { borderColor: selectedPlant === p.id ? p.avatar === "🌿" ? "#4CAF50" : "#8BC34A" : "#E0E0E0", borderWidth: selectedPlant === p.id ? 2 : 1 },
              ]}
              onPress={() => setSelectedPlant(p.id)}
            >
              <Text style={styles.plantOptionAvatar}>{p.avatar}</Text>
              <Text style={[
                styles.plantOptionName,
                { color: selectedPlant === p.id ? (p.avatar === "🌿" ? "#4CAF50" : "#8BC34A") : (isDark ? "#fff" : "#1c4a22") },
              ]}>{p.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Care Type Selector */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Care Activity</Text>
        <View style={styles.careGrid}>
          {careTypes.map((care) => (
            <Pressable
              key={care.id}
              style={[
                styles.careOption,
                { backgroundColor: selectedCare === care.id ? care.color + "20" : isDark ? "#2a2a2a" : "#fff", borderColor: selectedCare === care.id ? care.color : "#E0E0E0" },
              ]}
              onPress={() => setSelectedCare(care.id)}
            >
              <View style={[
                styles.careOptionIcon,
                { backgroundColor: selectedCare === care.id ? care.color : care.color + "20" },
              ]}>
                <Image
                  source={{ uri: `sf:${care.icon}` }}
                  style={[
                    styles.careOptionIconImage,
                    { tintColor: selectedCare === care.id ? "#fff" : care.color },
                  ]}
                />
              </View>
              <Text style={[
                styles.careOptionLabel,
                { color: selectedCare === care.id ? care.color : (isDark ? "#fff" : "#1c4a22") },
              ]}>{care.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Amount Input */}
      {careType && (careType.id === "watering" || careType.id === "fertilizing" || careType.id === "mist") && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Amount</Text>
          <View style={styles.amountInput}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
              ]}
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Picker
              selectedValue={unit}
              onValueChange={setUnit}
              style={styles.picker}
              itemStyle={[
                { color: isDark ? "#fff" : "#1c4a22", backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
            >
              <Picker.Item label="ml" value="ml" />
              <Picker.Item label="L" value="L" />
              <Picker.Item label="cups" value="cups" />
              <Picker.Item label="oz" value="oz" />
            </Picker>
          </View>
        </View>
      )}

      {/* Notes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Notes (Optional)</Text>
        <TextInput
          style={[
            styles.textArea,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
          ]}
          placeholder="How did it go? Any observations..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Photos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Photos</Text>
          {photos.length < 3 && (
            <Pressable style={styles.addPhotoBtn}>
              <Image source={{ uri: "sf:plus" }} style={styles.addPhotoIcon} />
              <Text style={styles.addPhotoText}>Add</Text>
            </Pressable>
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Pressable style={styles.removePhotoBtn} onPress={() => setPhotos(photos.filter((_, i) => i !== index))}>
                <Image source={{ uri: "sf:xmark.circle.fill" }} style={styles.removePhotoIcon} />
              </Pressable>
            </View>
          ))}
          {photos.length < 3 && (
            <Pressable style={styles.addPhotoPlaceholder}>
              <Image source={{ uri: "sf:camera.fill" }} style={styles.addPhotoPlaceholderIcon} />
              <Text style={styles.addPhotoPlaceholderText}>Add Photo</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>

      {/* Voice Note */}
      <View style={styles.section}>
        <Pressable style={styles.voiceNoteBtn}>
          <View style={styles.voiceNoteIcon}>
            <Image source={{ uri: "sf:mic.fill" }} style={styles.voiceNoteIconImage} />
          </View>
          <View>
            <Text style={[styles.voiceNoteTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Add Voice Note</Text>
            <Text style={[styles.voiceNoteDesc, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>Tap to record</Text>
          </View>
          <Image source={{ uri: "sf:chevron.right" }} style={styles.chevron} />
        </Pressable>
      </View>

      {/* Save Button */}
      <Pressable style={styles.bottomSaveBtn} onPress={handleSave}>
        <Text style={styles.bottomSaveBtnText}>Save Log Entry</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 22,
    height: 22,
    tintColor: "#1c4a22",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantSelector: {
    gap: 10,
  },
  plantOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 6,
    minWidth: 100,
  },
  plantOptionAvatar: {
    fontSize: 24,
  },
  plantOptionName: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  careGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  careOption: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  careOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  careOptionIconImage: {
    width: 24,
    height: 24,
  },
  careOptionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  amountInput: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  picker: {
    width: 100,
    height: 52,
  },
  textArea: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
  },
  addPhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  addPhotoIcon: {
    width: 16,
    height: 16,
    tintColor: "#4CAF50",
  },
  addPhotoText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4CAF50",
  },
  photosContainer: {
    gap: 10,
  },
  photoItem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removePhotoBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
  },
  removePhotoIcon: {
    width: 14,
    height: 14,
    tintColor: "#fff",
  },
  addPhotoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    gap: 6,
  },
  addPhotoPlaceholderIcon: {
    width: 24,
    height: 24,
    tintColor: "#9E9E9E",
  },
  addPhotoPlaceholderText: {
    fontSize: 11,
    color: "#9E9E9E",
    textAlign: "center",
  },
  voiceNoteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  voiceNoteIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FF980020",
    justifyContent: "center",
    alignItems: "center",
  },
  voiceNoteIconImage: {
    width: 24,
    height: 24,
    tintColor: "#FF9800",
  },
  voiceNoteTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  voiceNoteDesc: {
    fontSize: 13,
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#9E9E9E",
  },
  bottomSaveBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  bottomSaveBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
