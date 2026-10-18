
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";
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
  const [singlefile, setSingleFile] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setSingleFile(res);
    }
    catch (err) {
      console.error(err);
    }
  };

  function handleContinue() {
    if (!birthDate.trim()) {
      Alert.alert("Birth date required", "Enter your birth date.");
      return;
    }

    Alert.alert("Profile details", "Your profile form is working!");
  }

  return (
    <LinearGradient
      colors={["#6A9113", "#141517" ]}
      locations={[0, 0.1]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.brand}>LET'S PLAY</Text>

        <Text style={styles.heading}>Make it yours ✨</Text>

        <Text style={styles.subtitle}>
          Tell people a little about yourself.
        </Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.avatar} onPress={selectFile}>
            <Text style={styles.avatarText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.photoHint}>
            Add a profile photo
          </Text>

          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            placeholder="When were you born?"
            placeholderTextColor="#9CA3AF"
            value={birthDate}
            onChangeText={setBirthDate}
          />

          <Text style={styles.label}>Bio</Text>
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
    backgroundColor: "#6A9113",
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
