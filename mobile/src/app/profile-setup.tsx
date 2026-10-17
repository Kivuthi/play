
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileSetup() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  function handleContinue() {
    if (!displayName.trim()) {
      Alert.alert("Display name required", "Enter the name people will see.");
      return;
    }

    Alert.alert("Profile details", "Your profile form is working!");
  }

  return (
    <LinearGradient
      colors={["#1a2a6c", "#7028D8", "#b21f1f"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.brand}>LET'S PLAY</Text>

        <Text style={styles.heading}>Make it yours ✨</Text>

        <Text style={styles.subtitle}>
          Tell people a little about yourself.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>+</Text>
          </View>

          <Text style={styles.photoHint}>
            Add a profile photo later
          </Text>

          <Text style={styles.label}>Display name</Text>
          <TextInput
            style={styles.input}
            placeholder="What should people call you?"
            placeholderTextColor="#9CA3AF"
            value={displayName}
            onChangeText={setDisplayName}
          />

          <Text style={styles.label}>About me</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Share a little about yourself..."
            placeholderTextColor="#9CA3AF"
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={160}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Nairobi, Kenya"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />

          <Pressable
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue →</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 12,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 24,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EEE5FF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 38,
    color: "#7028D8",
  },
  photoHint: {
    textAlign: "center",
    color: "#777184",
    marginTop: 8,
    marginBottom: 24,
  },
  label: {
    color: "#302744",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E7E2EE",
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#241A35",
    backgroundColor: "#FCFAFF",
    marginBottom: 18,
  },
  bioInput: {
    height: 100,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  button: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#7028D8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
