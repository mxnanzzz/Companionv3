import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error signing in:", error);
        }
    };

    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            const userDocument = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();
            
            if (userDocument.exists) {
                navigation.navigate("Dashboard");
            } else {
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            console.log("Invalid Code", error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#f2f2f2" }}>
            <Text style={{ marginTop: 100, alignItems: "center", fontSize: 20 }}>
                Welcome to Companion Moto!
            </Text>

            {!confirm ? (
                <>
                    <Text style={{ marginTop: 100, marginBottom: 40, fontSize: 30 }}>
                        Please Enter your Mobile Number:
                    </Text>
                    <TextInput
                        style={{
                            height: 40,
                            width: "100%",
                            borderColor: "#bf6f6f",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10,
                        }}
                        placeholder="e.g., +63 912-345-6789"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity
                        onPress={signInWithPhoneNumber}
                        style={{
                            backgroundColor: "#A43232",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                            Send Code
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text
                        style={{
                            marginBottom: 20,
                            fontSize: 18
                        }}
                    >
                        Enter OTP Code from your Mobile:
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: "100%",
                            borderColor: "black",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10
                        }}
                        placeholder="Enter code"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity
                        onPress={confirmCode}
                        style={{
                            backgroundColor: "#A43232",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center",

                        }}
                    >
                        <Text style={{ color: "#F2F2F2", fontSize: 22, fontWeight: "bold" }}>
                            Confirm Code
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
