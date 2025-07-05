import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StoreContext } from "../storecontext/storeContextProvider";

type props={
    id: number;
  name: string;
  price: string;
  size:string;
  image:any;
  Quantity:number;
}
function CardComponent({id,name,price,Quantity,size,image}:props){
    const {items,updateItems}=useContext(StoreContext)
    const newsizes=size.split(",");
    const newprice=price.split(",");
    const [quantity,setQuantity]=useState(0);
    const [priceIndex,setPriceIndex]=useState(0);

//see the changes of selecting different sizes
const handleChange=(index:number)=>{
    setPriceIndex(index);
    updateItems({
        id,
        data: {
            count: quantity,
            name: name,
            size: newsizes[index], // use index directly
            price: newprice[index], // use index directly
        },
    });
}

const increase=()=>{
    setQuantity((prev)=>{
        let newQunty;
        if(prev<Quantity){
        newQunty=prev+1;
        }
        else{
            newQunty=prev;
        }
        updateItems({id,data:{count:newQunty,name:name,size:newsizes[priceIndex],price:newprice[priceIndex]}})
        return newQunty
    });
}
const decrease=()=>{
    setQuantity((prev)=>{
        let newQuanty;
            if(prev>1){
               newQuanty = prev-1;
            }else{
                newQuanty = 0;
            }
            updateItems({id,data:{count:newQuanty,name:name,size:newsizes[priceIndex],price:newprice[priceIndex]}})
        
            return newQuanty;
        });
}

    return(
        <>
        <View style={styles.container}>
            <ImageBackground source={{uri:image}} style={styles.background} >
            <View style={{backgroundColor:"rgba(255,255,255,0.7)",padding:10,width:"100%",height:"100%"}}>
                {/* this block is for the name and price to be situated side by side */}
                <View style={{flex:1,flexDirection:"row",alignContent:"center",justifyContent:"space-between"}}>
                    <Text style={{fontSize:20,fontWeight:"900",color:"black"}}>{name}</Text>
                    <Text style={{fontSize:19,color:"#3f51b5",fontWeight:900}}>₹{newprice[priceIndex]}</Text>
                </View>
                {/* this block is for setting quantity */}
                <View style={styles.increment}>
                    {/* //on touch */}
                    <TouchableOpacity onPress={decrease} >
                        <FontAwesome name="minus" size={14} color={"black"}/>
                    </TouchableOpacity>
                    <Text  style={{fontWeight:800,fontSize:15}}>{quantity}</Text>
                    <TouchableOpacity onPress={increase} >
                        <FontAwesome name="plus" size={14} color={"black"}/>
                    </TouchableOpacity>
                </View>
                {/* this is for selecting sizes  */}
                <View style={{flex:1,flexDirection:"row"}}>
                    {newsizes.length>0&&
                        newsizes.map((item,index)=>(
                           
                            <TouchableOpacity 
                            key={index}
                            onPress={()=>handleChange(index)} >
                                <Text style={{borderWidth:2,borderRadius:10,padding:5,marginRight:4,backgroundColor:priceIndex==index?"black":undefined,color:priceIndex==index?"white":undefined,fontWeight:500}}>{item}</Text>
                            </TouchableOpacity>
                           
                        ))
                    }
                </View>
                </View> 
            </ImageBackground>
        </View>
        </>
    )
}


//stylings
const styles=StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        marginBottom:12,
        marginHorizontal:8,
        marginVertical:5,
        backgroundColor:"rgba(255,255,255,0.1)",
        flex:1, 
        overflow:"hidden",

    },

    background:{        
        top:0,
        bottom:0,
        left:0,
        right:0,
        width:"100%",
        resizeMode:"cover",
        height:120,
        
    },
    increment:{
        flex:1,
        flexDirection:"row",
        width:70,
        minHeight:20,
        backgroundColor:"rgba(255,255,255,0.5)",
        borderRadius:20,
        justifyContent:"space-between",
        alignItems:"center",
        position:"absolute",
        top:70,
        padding:10,
        right:3

    },
   
})
export default CardComponent;