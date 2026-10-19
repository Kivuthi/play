
import { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

export default function EmailVerification() {
    const [code, setCode] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(90);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setSecondsLeft((previous) => previous - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const handleResend = () => {
        // We'll connect this to the backend later.
        setSecondsLeft(90);
        setCanResend(false);
    };

    const handleVerify = () => {
        // We'll connect code verification to the backend later.
        console.log("Verification code:", code);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>✉</Text>
                </View>

                <Text style={styles.heading}>Verify your email</Text>

                <Text style={styles.subtitle}>
                    We've sent a verification code to your email address.
                    Enter the code below to continue.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardHeading}>
                        Verification code
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        Enter the 6-digit code from your email.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="000000"
                        placeholderTextColor="#6B7280"
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={6}
                        value={code}
                        onChangeText={(value) =>
                            setCode(value.replace(/[^0-9]/g, ""))
                        }
                        returnKeyType="done"
                    />

                    <TouchableOpacity
                        style={[
                            styles.verifyButton,
                            code.length !== 6 && styles.disabledButton,
                        ]}
                        onPress={handleVerify}
                        disabled={code.length !== 6}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.verifyButtonText}>
                            Verify email
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                        Didn't receive the code?
                    </Text>

                    <TouchableOpacity
                        onPress={handleResend}
                        disabled={!canResend}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.resendButton,
                                !canResend && styles.disabledResend,
                            ]}
                        >
                            {canResend
                                ? "Resend code"
                                : `Resend code in ${secondsLeft}s`}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footer}>
                    Check your spam folder if the email doesn't appear.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141517",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    iconContainer: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#25331B",
        borderWidth: 1,
        borderColor: "#6A9113",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 24,
    },
    icon: {
        fontSize: 36,
        color: "#8FC43D",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 23,
        color: "#9CA3AF",
        textAlign: "center",
        marginBottom: 32,
    },
    card: {
        backgroundColor: "#1F2937",
        borderRadius: 18,
        padding: 22,
        borderWidth: 1,
        borderColor: "#374151",
    },
    cardHeading: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: "#9CA3AF",
        marginBottom: 20,
    },
    input: {
        height: 58,
        borderColor: "#4B5563",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: 8,
        textAlign: "center",
        marginBottom: 20,
    },
    verifyButton: {
        height: 52,
        borderRadius: 12,
        backgroundColor: "#6A9113",
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        backgroundColor: "#465331",
        opacity: 0.7,
    },
    verifyButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    resendContainer: {
        alignItems: "center",
        marginTop: 28,
    },
    resendText: {
        color: "#9CA3AF",
        fontSize: 14,
    },
    resendButton: {
        color: "#8FC43D",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        padding: 6,
    },
    disabledResend: {
        color: "#6B7280",
    },
    footer: {
        color: "#6B7280",
        fontSize: 12,
        textAlign: "center",
        marginTop: 32,
        lineHeight: 18,
    },
});
