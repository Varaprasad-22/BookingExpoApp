import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../fireaseConfig";
// @ts-ignore
import { RNHTMLtoPDF } from 'react-native-html-to-pdf';
type OrderItem = {
  id: string;
  orderTime: { seconds: number; nanoseconds: number }; // Firestore Timestamp
   phone: string;
  address: {
    Line1: string;
    city: string;
    pincode: string;
    state: string;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
};
// const videoSource =
//   "E:/gitappproject/assets/vedio/backgroundVedio.mp4";
function History(){
  //   const player = useVideoPlayer(videoSource, player => {
  //   player.loop = true;
  //   player.play();
  // });
  const [items,setItems]= useState<OrderItem[]>([]);
  const [login,setlogin]=useState(false);

  
  const [storedPhone, setStoredPhone] = useState<string | null>(null);

  //foucs or re renders every time when screen is visited 
  const isFocused = useIsFocused();
  useEffect(()=>{
    const fetchOrders=async()=>{
      const Phone=await AsyncStorage.getItem("userPhone");
      setStoredPhone(Phone);
      if(!Phone){
        setlogin(false);
        return;
      }
      setlogin(true);
      const data=query(collection(db,"orders"),where("phone","==",Phone.toString()));
      const docs=await getDocs(data);
      setItems(docs.docs.map(d=>({id:d.id,...d.data()} as OrderItem)))
    }
    {console.log(login)}
    fetchOrders();
  },[isFocused])
  let counter=1;
  

//generatio of pdf code
const generatePDF = async (item: OrderItem) => {
    const dateObj = new Date(item.orderTime.seconds * 1000);
    const formattedDate = dateObj.toLocaleDateString("en-GB");

    const itemsHTML = item.items.map(
      (it, i) =>
        `<tr>
          <td>${i + 1}</td>
          <td>${it.name}</td>
          <td>${it.quantity}</td>
          <td>₹${it.price}</td>
        </tr>`
    ).join("");

    const htmlContent = `
      <h1>Order Summary</h1>
      <p><strong>Order ID:</strong> ${item.id}</p>
      <p><strong>Phone:</strong> ${item.phone}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <h2>Address</h2>
      <p>${item.address.Line1}, ${item.address.city}, ${item.address.state} - ${item.address.pincode}</p>
      <h2>Items</h2>
      <table border="1" cellspacing="0" cellpadding="5">
        <tr><th>#</th><th>Name</th><th>Qty</th><th>Price</th></tr>
        ${itemsHTML}
      </table>
    `;

    try {
      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: `order_${item.id}`,
        directory: 'Documents',
      });
      Alert.alert("PDF Generated", `Saved to: ${file.filePath}`);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF");
      console.log(error);
    }
  };



//for expo go print 
const generatePDFExpo = async (order: OrderItem) => {
  const dateObj = new Date(order.orderTime.seconds * 1000);
  const formattedDate = dateObj.toLocaleDateString();

  const addressHtml = `
    <p><strong>Address:</strong><br/>
    ${order.address.Line1}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}</p>
  `;

  const itemsHtml = order.items.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price}</td>
      <td>₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  const html = `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1>Order Summary</h1>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        ${addressHtml}
        <h2>Items</h2>
        <table border="1" cellspacing="0" cellpadding="8" style="width:100%;text-align:left;">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          ${itemsHtml}
        </table>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("PDF generation failed", error);
  }
};

const handlePrint=(item:OrderItem)=>{
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    if (RNHTMLtoPDF && RNHTMLtoPDF.convert) {
      generatePDF(item); // use native for built APK
    } else {
      generatePDFExpo(item); // fallback for Expo Go
    }
  } else {
    generatePDFExpo(item); // web fallback
  }

}
    return(
      <SafeAreaView>
        <ScrollView style={{padding:20}}  showsVerticalScrollIndicator={false}>  
          
      {/* <VideoView  player={player} allowsFullscreen allowsPictureInPicture /> */}
        <Text style={{margin:"auto",fontWeight:"bold",fontSize:20,marginBottom:15}}>History</Text>
        {login?(
          <View >
           <View style={{ flexDirection: 'row', backgroundColor: '#eef',gap:70,padding:10,borderRadius:30,justifyContent:"space-around"}}>
              <Text style={styles.text}>Sno</Text>
              <Text style={styles.text}>Date</Text>
              <Text style={styles.text}>Download</Text>
            </View>
            <View style={{ margin:10, flexDirection: 'row',padding:5,borderBottomWidth:2,borderRadius:30}}>
             {/* <Text>1</Text>
              <Text>22/12/2004</Text> */}
              {items.length>0?( <>{items.map((item,id)=>{
                const dateObj = new Date(item.orderTime.seconds * 1000);
                const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
                return(
                <View key={id} style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                  <Text>{counter++}</Text>
                  
                  <Text>{formattedDate}</Text>
                  <TouchableOpacity onPress={() => handlePrint(item)}>
                  <FontAwesome style={{left:-16}} size={19} name="download" />
                  </TouchableOpacity>
                </View>)
                })}
              </>):(<Text>Order Items are Empty</Text>)}
            </View>
        </View>
      )
      :
      (
      <Text style={{fontWeight:"bold",margin:"auto"}}> Please Login To View</Text>
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
export default History;
