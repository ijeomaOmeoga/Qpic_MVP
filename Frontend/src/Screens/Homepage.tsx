import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type HomepageProps = {
    onGeneratePress?: () => void;
    onScanPress?: () => void;
};

export default function Homepage({ onGeneratePress, onScanPress }: HomepageProps) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonStack}>
                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [
                        styles.actionButton,
                        styles.primaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={onGeneratePress}
                >
                    <Ionicons name="qr-code-outline" size={28} color="#ffffff" />
                    <Text style={styles.buttonText}>Generate QRCode</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [
                        styles.actionButton,
                        styles.secondaryButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={onScanPress}
                >
                    <Ionicons name="scan-outline" size={28} color="#ffffff" />
                    <Text style={styles.buttonText}>Scan QRCode</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f7fb',
        paddingHorizontal: 24,
    },
    buttonStack: {
        width: '100%',
        maxWidth: 360,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
    },
    actionButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 24,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButton: {
        backgroundColor: '#2f80ed',
    },
    secondaryButton: {
        backgroundColor: '#1f9d8a',
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
});
