import React, {useState } from "react";
import { View, Text,TextInputBase, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function Details ({route, navigation}) {
    const {uid} = route.params;
    const [name, setName] = useState ("");
    const [age, setAge] = useState ("");
    const [emergContact, setemergContact] = useState ("");
    //const [gender, setGender] = useState ("");
    const [add, setAdd] = useState ("");

    const saveDetails = async () => {
        try {
            await firestore().collection("users").doc(uid).set({
                name,
                age,
                emergContact,
                add
            });

            navigation.navigate("Dashboard");
    } catch (error) {
        console.log("Error, Details can't be Saved", error);
    }
};

return (
    <View style={{flex:1, padding:10, backgroundColor:"#BBBBBB"}}>
        <Text
            Style = {{
            fontSize: 20,
            marginTop: 200,
            alignItems: "center"
            }}>
        Please Enter your Details 
        </Text>
        <TextInput style={{
            height:50,
            width:"100%",
            borderColor: "#a43232",
            borderWidth:1,
            marginTop:50,
            marginBottom:50,
            paddingHorizontal: 10
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        />

        <TextInput style={{
            height:50,
            width:"100%",
            borderColor: "#a43232",
            borderWidth:1,
            marginBottom:50,
            paddingHorizontal: 10
        }}
     
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        />
            <TextInput style={{
            height:50,
            width:"100%",
            borderColor: "#a43232",
            borderWidth:1,
            marginBottom:50,
            paddingHorizontal: 10
        }}
     
        placeholder="Address"
        value={add}
        onChangeText={setAdd}
        />
        <TextInput style={{
            height:50,
            width:"100%",
            borderColor: "#a43232",
            borderWidth:1,
            marginBottom:50,
            paddingHorizontal: 10
        }}
     
        placeholder="Emergency Contact"
        value={emergContact}
        onChangeText={setemergContact}
        />
        
        <TouchableOpacity
            onPress={saveDetails}
            style={{
                backgroundColor: "#a43232",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                alignItems:"center"
            }} 
            >
            
            <Text style ={{fontSize: 40, color: "#f2f2f2"}}>
            Click to Confirm
            </Text>
            </TouchableOpacity>
            </View>

        );
        }