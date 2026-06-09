import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

export default function AddEditPlantSheet() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

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
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Add Plant</Text>
        <Pressable style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Details</Text>
        <View style={styles.field}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Name</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
            ]}
            placeholder="e.g., My Monstera"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.field}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Type</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
            ]}
            placeholder="Search or select plant type"
            value={type}
            onChangeText={setType}
          />
        </View>
        <View style={styles.field}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Location</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
            ]}
            placeholder="e.g., Living room, balcony"
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Photo</Text>
        <Pressable style={styles.addPhotoBtn}>
          <Image source={{ uri: "sf:camera.fill" }} style={styles.addPhotoIcon} />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </Pressable>
      </View>

      <Pressable style={styles.bottomSaveBtn} onPress={() => router.back()}>
        <Text style={styles.bottomSaveBtnText}>Save Plant</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  contentContainer: { padding: 16, paddingBottom: 100, gap: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  closeButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center" },
  closeIcon: { width: 22, height: 22, tintColor: "#1c4a22" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", flex: 1 },
  saveButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#4CAF50", justifyContent: "center", alignItems: "center" },
  saveButtonText: { fontSize: 13, fontWeight: "600", color: "#fff" },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  field: { gap: 8 },
  label: { fontSize: 14, fontWeight: "500" },
  input: { height: 52, borderRadius: 12, borderWidth: 1, borderColor: "#E0E0E0", paddingHorizontal: 16, fontSize: 16 },
  addPhotoBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, borderRadius: 12, backgroundColor: "#4CAF5020", borderWidth: 1, borderColor: "#4CAF50" },
  addPhotoIcon: { width: 24, height: 24, tintColor: "#4CAF50" },
  addPhotoText: { fontSize: 16, fontWeight: "600", color: "#4CAF50" },
  bottomSaveBtn: { paddingVertical: 16, borderRadius: 12, backgroundColor: "#4CAF50", alignItems: "center" },
  bottomSaveBtnText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});
