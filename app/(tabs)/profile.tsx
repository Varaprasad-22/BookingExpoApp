import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function Profile(){
    const [Login,setLogin]=useState(false);
    const [name,setName]=useState("User");
    useEffect(()=>{
        const logout=async()=>{
            const stored=await AsyncStorage.getItem("userPhone");
            
            const storedName=await AsyncStorage.getItem("userName");
            if(!stored){
                setLogin(false);
                setName("User");
                return;
            }
            setLogin(true);
            setName(storedName||"user");
        }
        logout();
    },[])
    const handleLogout=async()=>{
        await AsyncStorage.removeItem("userPhone");
       await AsyncStorage.removeItem("userName");
        setLogin(false);
        setName("User")
    }
    return(
        <SafeAreaView style={{padding:20}}>
            {/* <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,marginBottom:15}}>Profile</Text> */}
            <FontAwesome name="user-circle" size={30} style={{margin:"auto"}}/>
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,marginBottom:15}}>{name}</Text>
            <View style={{}}>
                <View >
                    <TouchableOpacity 
                    onPress={()=>router.push("/accounts")}
                    style={styles.mainSection}>
                        <Text>Accounts</Text>
                        <FontAwesome name="arrow-circle-right" size={20}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                    
                    onPress={()=>router.push("/about")}
                    style={styles.mainSection}>
                        <Text>About</Text>
                        <FontAwesome name="arrow-circle-right" size={20}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity                     
                    onPress={()=>router.push("/delivery")}
                    style={styles.mainSection}>
                        <Text>Delivery</Text>
                        <FontAwesome name="arrow-circle-right" size={20}/>
                    </TouchableOpacity>
                </View>
            </View>
            {Login?(<TouchableOpacity onPress={()=>handleLogout()} style={{flexDirection:"row",alignItems:"center" ,gap:10,borderWidth:2,width:80,padding:10,borderRadius:20,margin:"auto",backgroundColor:"#eef",elevation:8}}>
                <FontAwesome6 name="user"/>
                <Text>Logout</Text>
            </TouchableOpacity>
            )
            :
            (<TouchableOpacity onPress={()=>router.push("/signin")} style={{flexDirection:"row",alignItems:"center" ,gap:10,borderWidth:2,width:80,padding:10,borderRadius:20,margin:"auto",backgroundColor:"#eef",elevation:8}}>
                <FontAwesome6 name="user"/>
                <Text>Login</Text>
            </TouchableOpacity>)}
            
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    mainSection:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10,
        alignItems:"center",
        borderBottomWidth:2,
        borderRadius:30,
        padding:10
    }
})
export default Profile;