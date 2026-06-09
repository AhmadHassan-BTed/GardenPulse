import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, Keyboard } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { useState } from "react";

export default function AddPlantScreen() {
  const router = useRouter();
  const { method } = useLocalSearchParams<{ method?: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [location, setLocation] = useState("");

  const plantTypes = [
    "Monstera", "Snake Plant", "Pothos", "ZZ Plant", "Fiddle Leaf Fig",
    "Spider Plant", "Peace Lily", "Rubber Plant", "Bird of Paradise", "Philodendron",
    "Tomato", "Basil", "Mint", "Lettuce", "Pepper",
    "Rose", "Lavender", "Sunflower", "Hydrangea", "Orchid",
  ];

  const handleContinue = () => {
    if (!plantName.trim() || !plantType.trim()) return;
    Keyboard.dismiss();
    router.replace({
      pathname: "/(onboarding)/care-plan",
      params: { method, plantName, plantType, location },
    });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.stepLabel, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>
          Step 3 of 4
        </Text>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>
          Add Your First Plant
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Tell us about your new green friend
        </Text>
      </View>

      <View style={styles.form}>

        <View style={styles.field}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Plant Name</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
            ]}
            placeholder="e.g., My Monstera"
            placeholderTextColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(28,74,34,0.4)"}
            value={plantName}
            onChangeText={setPlantName}
            autoCapitalize="words"
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
            placeholderTextColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(28,74,34,0.4)"}
            value={plantType}
            onChangeText={setPlantType}
            list={plantType ? undefined : "plant-types"}
            autoCapitalize="words"
          />
          <datalist id="plant-types">
            {plantTypes.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Location</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
            ]}
            placeholder="e.g., Living room, balcony, garden bed"
            placeholderTextColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(28,74,34,0.4)"}
            value={location}
            onChangeText={setLocation}
            autoCapitalize="words"
          />
        </View>

      </View>

      <View style={styles.actions}>
        <Pressable
          style={[
            styles.primaryButton,
            { backgroundColor: plantName && plantType ? "#4CAF50" : "#9E9E9E" },
          ]}
          onPress={handleContinue}
          disabled={!plantName || !plantType}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
        <Link href="/(onboarding)/welcome" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c4a22",
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    gap: 12,
    marginTop: 20,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1c4a22",
  },
});