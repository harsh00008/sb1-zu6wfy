import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { GoogleSignIn } from "@nativescript/google-signin";

type SignInScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "SignIn">,
};

export function SignInScreen({ navigation }: SignInScreenProps) {
    const [isSigningIn, setIsSigningIn] = React.useState(false);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await GoogleSignIn.configure({
                scopes: ['profile', 'email'],
                webClientId: 'YOUR_WEB_CLIENT_ID_HERE', // Replace with your web client ID
            });
            const user = await GoogleSignIn.signIn();
            console.log('Signed in successfully:', user);
            navigation.navigate("One");
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center">
                Welcome to the App
            </label>
            <button
                style={styles.button}
                onTap={handleSignIn}
                isEnabled={!isSigningIn}
            >
                {isSigningIn ? "Signing In..." : "Sign In with Google"}
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    button: {
        fontSize: 18,
        color: "#ffffff",
        backgroundColor: "#4285F4",
        padding: 10,
        borderRadius: 5,
    },
});