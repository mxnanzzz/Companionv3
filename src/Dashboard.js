import React from "react";
import { View, Text,TextInputBase, StyleSheet, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard(){
    const navigation=useNavigation();

    const handleLogout = async () => {
        try{

            await auth().signOut();
            navigation.reset ({
                index: 0,
                routes:[{name: "Login"}],
            });
        }
            catch (error) {
                console.log("Error Cannot Sign In"), error;

            } 
        };
    return (
        <View style={{flex:1, padding:10, backgroundColor:"#BBBBBB"}}>
        <Text style = {{
                marginTop: 300, alignItems: "center", fontSize: 25
            }}
        >
        Welcome KaMoto! Ride Safe.
        </Text>

        <TouchableOpacity
            onPress={handleLogout}
            style={{
                backgroundColor: "#a43232",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
               // marginBottom: 20,
                alignItems:"center"
            }} 
            >
                <Text style ={{color:"#bf6f6f", fontSize:40, fontWeight:"bold"}}>
                LogOut
                </Text>
            </TouchableOpacity>
            </View>
    );
    
}
