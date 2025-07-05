import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import StoreContextProvider from "../storecontext/storeContextProvider";
// import { useEffect } from 'react';
// import Animated, {
//     useAnimatedStyle,
//     useSharedValue,
//     withTiming,
// } from 'react-native-reanimated';

// function TabIcons({
//   focused,
//   icons,
//   name,
// }: {
//   focused: boolean;
//   icons: string;
//   name: string;
// }) {
//   const scale = useSharedValue(1);
//   const opacity = useSharedValue(0.8);
//   const bg = useSharedValue("white");

//   useEffect(() => {
//     scale.value = withTiming(focused ? 1.1 : 1, { duration: 250 });
//     opacity.value = withTiming(focused ? 1 : 0.8, { duration: 250 });
//     bg.value = withTiming(focused ? "#cedce9" : "white", { duration: 250 });
//   }, [focused]);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//     opacity: opacity.value,
//     backgroundColor: bg.value,
//   }));

//   return (
//     <Animated.View
//       style={[
//         {
//           flex: 1,
//           flexDirection: "row",
//           padding: 10,
//           borderRadius: 50,
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 10,
//           elevation: 5,
//         },
//         animatedStyle,
//       ]}
//     >
//       <FontAwesome name={icons as any} size={24} color="black" />
//       <Text style={{ fontSize: 16 }}>{name}</Text>
//     </Animated.View>
//   );
// }

//function for layout of tab switches

function TabIcons({focused,icons,name}:{focused:boolean,icons:string,name:string}){
    return(
    <Animatable.View  
    animation={focused?"fadeIn":undefined}
    duration={300}
    style={{flexDirection:"row",flex:1,
                    // borderWidth:focused?2:0,
                    borderColor:"black",
                    borderRadius:focused?99:0,
                    backgroundColor:focused?"rgba(255, 255, 255, 0.4)":'rgba(255, 255, 255, 0.1)',
                    // elevation:focused?5:0,
                    padding:10,
                    width:focused?89:105,
                    
                    minHeight:67,
                    overflow:"hidden",
                    // Anima
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    
                    }}>
                    <FontAwesome name={icons as any} size={focused?27:24} color={focused?"#3f51b5":"black"}  />
                    <Text style={{fontSize:focused?16:15,fontWeight:focused?"500":"400",color:focused?"#36454F":undefined}}>{name}</Text>
    </Animatable.View>
    );
}



function _layout(){
    return(
        <StoreContextProvider>
        <Tabs screenOptions={{tabBarShowLabel:false,
        tabBarStyle:{
            borderWidth:undefined,
            // borderCurve:10,
            borderRadius:50,
            height:50,
            padding:80,
            position:"absolute",
            justifyContent:"space-between",
            alignItems:"center",
            zIndex:0,
            margin:20,
            // borderColor:"red",
           backgroundColor:'rgba(255, 2595, 255, 0.3)',
           overflow:"hidden"            
        }
        }}>
            <Tabs.Screen name="index" options={{headerShown:false, title:"Home",
                tabBarIcon:({focused})=>(
               
                <TabIcons focused={focused} icons="home" name="Home"/>
                
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="order" options={{headerShown:false,title:"Order",
                tabBarIcon:({focused})=>(
                <>
               
                <TabIcons focused={focused} icons="cart-arrow-down" name="Order"/>
                </>
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="history" options={{headerShown:false,title:"History",
                tabBarIcon:({focused})=>(
                <>
                <TabIcons focused={focused} icons="history" name="History"/>
                </>
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="profile" options={{headerShown:false,title:"Profile",
                tabBarIcon:({focused})=>(
                <>
                <TabIcons focused={focused} icons="user-circle" name="Profile"/>
                </>
                )
            }}></Tabs.Screen>
        </Tabs>
        </StoreContextProvider>
    )
}

export default  _layout;
