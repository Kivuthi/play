
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  
  async function handleContinue() {
    if (
      !fullName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !nationalId.trim() ||
      !password.trim() ||
      !passwordConfirmation.trim()
    ) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Invalid password", "Password must have at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert("Invalid password", "Include at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      Alert.alert("Invalid password", "Include at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      Alert.alert("Invalid password", "Include at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Alert.alert("Invalid password", "Include at least one special character.");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.12:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            username: username.trim(),
            email: email.trim(),
            nationalId: nationalId.trim(),
            password,
            passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Registration failed", data.message || "Please try again.");
        return;
      }

      Alert.alert("Success", data.message || "Registration successful!");

    } 
    catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Connection error",
        "Could not reach the server. Check your connection and try again."
      );
    }
  }


  return (
    <LinearGradient
      colors={["#1a2a6c", "#b21f1f", "#fdbb2d", "#5e4a3a"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>✦</Text>
            </View>

            <Text style={styles.brand}>LET'S PLAY</Text>
            <Text style={styles.heading}>Create your account</Text>
            <Text style={styles.subtitle}>
              Your next adventure starts here.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeading}></Text>
            <Text style={styles.cardSubtitle}>
              Enter your details to get started.
            </Text>

            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex Johnson"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <Text style={styles.label}>National ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your National ID"
              placeholderTextColor="#9CA3AF"
              value={nationalId}
              onChangeText={setNationalId}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue  →</Text>
            </Pressable>

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={styles.loginText}
                onPress={() =>
                  Alert.alert("Coming soon", "We'll build the login screen next.")
                }
              >
                Log in
              </Text>
            </Text>
          </View>

          <Text style={styles.bottomText}>
            Made for good times and new connections ✨
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 36,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 4,
    marginBottom: 12,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 24,
    shadowColor: "#3B0764",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  cardHeading: {
    color: "#18112B",
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#777184",
    fontSize: 14,
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
  button: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#7028D8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  footerText: {
    textAlign: "center",
    color: "#777184",
    fontSize: 13,
    marginTop: 22,
  },
  loginText: {
    color: "#7028D8",
    fontWeight: "800",
  },
  bottomText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
    opacity: 0.9,
  },
});
