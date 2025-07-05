import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoreContext } from "../storecontext/storeContextProvider";

function Order(){
    const {items}=useContext(StoreContext);
    const list=Object.values(items);
    const [line,setLine]=useState('');
    const total=list.reduce((sum, i) => sum +Number( i.price )* i.count, 0);
    const [pincode,setpincode]=useState('');
    const [State,setState]=useState('');
    const [city,setcity]=useState('');
    const [login,setlogin]=useState(false);
    const isFastReload=useIsFocused();
    useEffect(()=>{
        const x=AsyncStorage.getItem("userPhone");
        if(!x){
            setlogin(false);
            return;
        }
        setlogin(true);
    },[isFastReload]);

    // const uploadData=async()=>{
    //     try{
    //         await addDoc(collection(db,"orders",{
    //             address:{
    //                 Line1:line,
    //                 pincode:pincode,
    //                 city:city,
    //                 state:State
    //             }
    //         }))

    //     }catch(error){
    //         Alert.alert("Failed to Purchase");
    //         return;
    //     }
    // }
    return(
        <SafeAreaView>
        <ScrollView style={{padding:10}} showsVerticalScrollIndicator={false}>
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,marginBottom:15}}>Your Cart</Text>
            

            {list.length==0?(<Text style={{textAlign:"center",fontWeight:"bold",fontSize:16}}>Your cart is Empty Please Shop</Text>):(
                <View style={{padding:10}}>
                <View style={{ flexDirection: 'row', backgroundColor: '#eef',gap:70,padding:10,borderRadius:30,justifyContent:"space-around"}}>
                            <Text style={styles.text}>Name</Text>
                            <Text style={styles.text}>Qty</Text>
                            <Text style={styles.text}>Price</Text>
                </View>
                {list.map((item)=>(
                    <View key={item.id} style={{flexDirection:"row",gap:75,padding:10,borderBottomWidth:2,borderRadius:10,justifyContent:"space-around"}}>
                        <Text>{item.name}({item.size})</Text>
                        <Text>{item.count}</Text>
                        <Text>₹{Number(item.price)*item.count}</Text>
                    </View>
                ))}
                <Text style={{textAlign:"center",marginTop:10,fontWeight:"bold",fontSize:19,borderBottomWidth:2,borderRadius:10}}>Total {total}</Text>
                <View style={{marginTop:20}}>
                    <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,marginBottom:10}}>Address</Text>
                    <View>
                            <TextInput  placeholder="Enter Your address" style={{marginBottom:10,borderBottomWidth:2,borderRadius:10}} value={line}
                             onChangeText={(value)=>setLine(value)}/>
                         <TextInput  placeholder="Enter Your Pincode" style={{marginBottom:10,borderBottomWidth:2,borderRadius:10}} value={pincode}
                             onChangeText={(value)=>setpincode(value)}/>
                              <TextInput  placeholder="Enter Your City" style={{marginBottom:10,borderBottomWidth:2,borderRadius:10}} value={city}
                             onChangeText={(value)=>setcity(value)}/>
                              <TextInput  placeholder="Enter Your State" style={{marginBottom:10,borderBottomWidth:2,borderRadius:10}} value={State}
                             onChangeText={(value)=>setState(value)}/>
                    </View>
                </View>
                <View style={{flexDirection:"row",alignItems:"center" ,gap:10,borderWidth:2,width:70,padding:10,borderRadius:20,margin:"auto",backgroundColor:"#eef",elevation:8}}>
                <FontAwesome name="money"/>
                <Text>Pay</Text>
                </View>
                </View>
            )}
        </ScrollView>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    text:{
        fontSize:15,
        fontWeight:"bold",
    }
})
export default Order;