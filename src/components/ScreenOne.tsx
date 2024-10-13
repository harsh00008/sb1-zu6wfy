import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { GoogleSignIn } from "@nativescript/google-signin";

import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    const [userInfo, setUserInfo] = React.useState(null);

    React.useEffect(() => {
        const getCurrentUser = async () => {
            const user = await GoogleSignIn.getCurrentUser();
            setUserInfo(user);
        };
        getCurrentUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await GoogleSignIn.signOut();
            navigation.navigate("SignIn");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center">
                Welcome, {userInfo?.name || 'User'}!
            </label>
            <button
                style={styles.button}
                onTap={() => Dialogs.alert("Tapped!")}
            >
                Tap me for an alert
            </button>
            <button
                style={styles.button}
                onTap={() => navigation.navigate("Two", { message: "Hello, world!" })}
            >
                Go to next screen
            </button>
            <button
                style={styles.button}
                onTap={handleSignOut}
            >
                Sign Out
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
    },
    button: {
        fontSize: 24,
        color: "#2e6ddf",
        marginBottom: 10,
    },
});