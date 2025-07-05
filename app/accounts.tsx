import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Accounts(){
    return(
        <SafeAreaView style={{padding:10}}>
            <TouchableOpacity onPress={()=>router.push("/(tabs)/profile")}>
                <FontAwesome name="arrow-left"  size={20}/>
            </TouchableOpacity>
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,marginBottom:15}}> You can develop if Further needed</Text>
        </SafeAreaView>
    )
}
export default Accounts;