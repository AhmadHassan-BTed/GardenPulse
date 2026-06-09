import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Picker } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { useState, useCallback } from "react";

const nutrientParts = [
  { id: "part-a", name: "Part A (Grow)", npk: "5-0-1", color: "#4CAF50" },
  { id: "part-b", name: "Part B (Bloom)", npk: "0-5-4", color: "#FF9800" },
  { id: "part-c", name: "Part C (Micro)", npk: "2-0-0", color: "#2196F3" },
  { id: "cal-mag", name: "Cal-Mag", npk: "2-0-0 + Ca/Mg", color: "#9C27B0" },
  { id: "silica", name: "Silica", npk: "0-0-0 + Si", color: "#607D8B" },
];

const presets = [
  { id: "seedling", name: "Seedling/Clone", ec: 0.8, ppm: 400, phase: "Vegetative" },
  { id: "vegetative", name: "Vegetative", ec: 1.5, ppm: 750, phase: "Vegetative" },
  { id: "early-bloom", name: "Early Bloom", ec: 2.0, ppm: 1000, phase: "Flowering" },
  { id: "mid-bloom", name: "Mid Bloom", ec: 2.4, ppm: 1200, phase: "Flowering" },
  { id: "late-bloom", name: "Late Bloom", ec: 1.8, ppm: 900, phase: "Flowering" },
  { id: "flush", name: "Flush", ec: 0.2, ppm: 100, phase: "Flushing" },
];

export default function NutrientCalculatorScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [volume, setVolume] = useState("10");
  const [unit, setUnit] = useState("L");
  const [targetEC, setTargetEC] = useState("1.5");
  const [selectedPreset, setSelectedPreset] = useState("vegetative");
  const [recipe, setRecipe] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const calculateRecipe = useCallback(() => {
    const vol = parseFloat(volume) || 0;
    const ec = parseFloat(targetEC) || 0;
    if (vol <= 0 || ec <= 0) return;

    // Simplified calculation - in real app this would be more complex
    const newRecipe: Record<string, string> = {};
    nutrientParts.forEach((part) => {
      let ml = 0;
      switch (part.id) {
        case "part-a": ml = vol * (ec * 1.2); break;
        case "part-b": ml = vol * (ec * 0.8); break;
        case "part-c": ml = vol * (ec * 1.0); break;
        case "cal-mag": ml = vol * 0.5; break;
        case "silica": ml = vol * 0.3; break;
      }
      newRecipe[part.id] = ml.toFixed(1);
    });
    setRecipe(newRecipe);
    setShowResult(true);
  }, [volume, targetEC]);

  const handlePresetSelect = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setTargetEC(preset.ec.toString());
      calculateRecipe();
    }
  };

  const totalML = Object.values(recipe).reduce((sum, val) => sum + parseFloat(val), 0);
  const estimatedCost = totalML * 0.02; // $0.02 per ml average

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#1c4a22" }]}>Nutrient Calculator</Text>
        <Text style={[styles.subtitle, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
          Mix precise nutrient recipes for optimal growth
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Mix Parameters</Text>
        
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Volume</Text>
            <View style={styles.volumeInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
                ]}
                placeholder="10"
                value={volume}
                onChangeText={setVolume}
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
                <Picker.Item label="Liters" value="L" />
                <Picker.Item label="Gallons" value="gal" />
              </Picker>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Target EC</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff", color: isDark ? "#fff" : "#1c4a22" },
              ]}
              placeholder="1.5"
              value={targetEC}
              onChangeText={setTargetEC}
              keyboardType="decimal-pad"
            />
            <Text style={[styles.unitLabel, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>mS/cm</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#1c4a22" }]}>Growth Phase Presets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetContainer}>
            {presets.map((preset) => (
              <Pressable
                key={preset.id}
                style={[
                  styles.presetChip,
                  { backgroundColor: selectedPreset === preset.id ? "#4CAF50" : isDark ? "#2a2a2a" : "#fff", borderColor: selectedPreset === preset.id ? "#4CAF50" : "#E0E0E0" },
                ]}
                onPress={() => handlePresetSelect(preset.id)}
              >
                <Text style={[
                  styles.presetChipText,
                  { color: selectedPreset === preset.id ? "#fff" : isDark ? "#fff" : "#1c4a22" },
                ]}>{preset.name}</Text>
                <Text style={[
                  styles.presetChipSub,
                  { color: selectedPreset === preset.id ? "rgba(255,255,255,0.8)" : isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" },
                ]}>{preset.ec} EC · {preset.ppm} PPM</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Pressable style={styles.calculateButton} onPress={calculateRecipe}>
          <Text style={styles.calculateButtonText}>Calculate Recipe</Text>
        </Pressable>
      </View>

      {/* Result Section */}
      {showResult && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Your Recipe</Text>
            <View style={styles.resultSummary}>
              <Text style={[styles.summaryItem, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
                Total: {totalML.toFixed(1)} ml
              </Text>
              <Text style={[styles.summaryItem, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(28,74,34,0.7)" }]}>
                Est. Cost: ${estimatedCost.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.recipeGrid}>
            {nutrientParts.map((part) => (
              <View key={part.id} style={[
                styles.recipeCard,
                { borderColor: part.color },
              ]}>
                <View style={[
                  styles.recipeCardHeader,
                  { backgroundColor: part.color + "20" },
                ]}>
                  <View style={[
                    styles.recipeColorDot,
                    { backgroundColor: part.color },
                  ]} />
                  <Text style={[styles.recipePartName, { color: isDark ? "#fff" : "#1c4a22" }]}>{part.name}</Text>
                  <Text style={[styles.recipeNPK, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(28,74,34,0.6)" }]}>{part.npk}</Text>
                </View>
                <View style={styles.recipeAmount}>
                  <Text style={[styles.recipeAmountValue, { color: part.color }]}>{recipe[part.id] || "0"}</Text>
                  <Text style={[styles.recipeAmountUnit, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>ml</Text>
                </View>
                <View style={styles.recipePerLiter}>
                  <Text style={[styles.recipePerLiterText, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(28,74,34,0.5)" }]}>
                    {(parseFloat(recipe[part.id] || "0") / (parseFloat(volume) || 1)).toFixed(1)} ml/L
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.resultActions}>
            <Link href="/modals/export-share" asChild>
              <Pressable style={styles.exportButton}>
                <Image source={{ uri: "sf:square.and.arrow.up" }} style={styles.actionIcon} />
                <Text style={styles.actionText}>Export Recipe</Text>
              </Pressable>
            </Link>
            <Link href="/modals/rewarded-video" asChild>
              <Pressable style={styles.saveButton}>
                <Image source={{ uri: "sf:arrow.down.circle.fill" }} style={styles.actionIcon} />
                <Text style={styles.actionText}>Save (Watch Ad)</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#1c4a22" }]}>Pro Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.tipIcon, { tintColor: "#FFD700" }]} />
            <Text style={[styles.tipText, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
              Always add Part A first, then Part B, then Part C to prevent nutrient lockout
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.tipIcon, { tintColor: "#FFD700" }]} />
            <Text style={[styles.tipText, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
              Let each part dissolve completely before adding the next
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Image source={{ uri: "sf:lightbulb.fill" }} style={[styles.tipIcon, { tintColor: "#FFD700" }]} />
            <Text style={[styles.tipText, { color: isDark ? "rgba(255,255,255,0.8)" : "rgba(28,74,34,0.8)" }]}>
              Check pH after mixing - target 5.5-6.5 for hydroponics, 6.0-6.8 for soil
            </Text>
          </View>
        </View>
      </View>
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
    gap: 24,
  },
  header: {
    gap: 4,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  volumeInputContainer: {
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
  unitLabel: {
    fontSize: 14,
    marginTop: -4,
  },
  presetContainer: {
    gap: 10,
  },
  presetChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 120,
  },
  presetChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  presetChipSub: {
    fontSize: 11,
    marginTop: 2,
  },
  calculateButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultSummary: {
    flexDirection: "row",
    gap: 16,
  },
  summaryItem: {
    fontSize: 13,
    fontWeight: "500",
  },
  recipeGrid: {
    gap: 12,
  },
  recipeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#fff",
    gap: 12,
  },
  recipeCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  recipeColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  recipePartName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  recipeNPK: {
    fontSize: 12,
  },
  recipeAmount: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  recipeAmountValue: {
    fontSize: 28,
    fontWeight: "700",
  },
  recipeAmountUnit: {
    fontSize: 14,
    fontWeight: "500",
  },
  recipePerLiter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  recipePerLiterText: {
    fontSize: 12,
  },
  resultActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  exportButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFD700",
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: "#1c4a22",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c4a22",
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  tipIcon: {
    width: 22,
    height: 22,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
