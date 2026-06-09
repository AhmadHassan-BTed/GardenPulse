import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../layout/ThemeProvider';
import CustomSlider from './CustomSlider';
import RadioGroup from './RadioGroup';
import CustomSwitch from './CustomSwitch';

export const FontSelector = () => {
  const [isDyslexic, setIsDyslexic] = useState(false);
  return (
    <CustomSwitch 
      label="Dyslexia-Friendly Font" 
      description="Switches app font to OpenDyslexic" 
      value={isDyslexic} 
      onValueChange={setIsDyslexic} 
    />
  );
};

export const TextSizeSlider = () => {
  const [size, setSize] = useState(2); // 1 to 5
  return (
    <CustomSlider 
      label="Text Size" 
      value={size} 
      onValueChange={setSize} 
      // Assuming CustomSlider takes min/max/step in a real implementation, 
      // but we use the existing prop structure for the showcase
    />
  );
};

export const LanguageSelector = () => {
  const [lang, setLang] = useState<string | number>('en');
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'gray' }}>Language</Text>
      <RadioGroup 
        options={[
          { label: 'English', value: 'en' },
          { label: 'German', value: 'de' },
          { label: 'French', value: 'fr' }
        ]} 
        selectedValue={lang} 
        onSelect={setLang} 
      />
    </View>
  );
};

export const DateFormatSelector = () => {
  const [format, setFormat] = useState<string | number>('ddmm');
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'gray' }}>Date Format</Text>
      <RadioGroup 
        horizontal
        options={[
          { label: 'DD/MM/YYYY', value: 'ddmm' },
          { label: 'MM/DD/YYYY', value: 'mmdd' }
        ]} 
        selectedValue={format} 
        onSelect={setFormat} 
      />
    </View>
  );
};