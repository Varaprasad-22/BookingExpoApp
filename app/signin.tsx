import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { router } from "expo-router";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "./fireaseConfig";
function SignIn(){
    const [step,setStep]=useState(1);
    const [login,setLogin]=useState("signin");
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [otp,setOtp]=useState("");
  const [id, setId] = useState("");
    // const sendOtp=()=>{
    //     setStep(2)
    // }
    
const recaptcha = useRef<FirebaseRecaptchaVerifierModal>(null);

//send otp setup;
    const sendOtp=async()=>{
        const phoneNumber="91"+phone;
        try{
            const provider=new PhoneAuthProvider(auth);
            const userDoc=doc(db,"users",phoneNumber);
            const data=await getDoc(userDoc);
            if(login==="login"&&!data.exists()){
               return Alert.alert("Please SignIn");
            }
            if (login === "signin" && !data.exists()) {
                return Alert.alert("Real time Authentication still awaits");
            }
            if (login === "signin" && data.exists()) {
               return  Alert.alert("Please Login");
            }
            const id=await provider.verifyPhoneNumber(
                "+91"+phone,
                recaptcha.current!
            );
            
            if(data.exists()){
                const userdata=data.data();
            setName(userdata.name.toString())}
            setId(id);
            setStep(2);
        }catch(error){
            alert("failed to send otp");
            console.log(error)
        }
    }
    const verifyOtp=async()=>{
        try{
            const credential=PhoneAuthProvider.credential(id,otp);
            await signInWithCredential(auth,credential);
            //save data
            await AsyncStorage.setItem("userName",name);
            await AsyncStorage.setItem("userPhone",phone.toString());
             setStep(1),
        router.push("/(tabs)")
        }catch(error){
            alert("failed to verify otp");
            console.log(error)
        }
       
    }
    const reset=()=>{
        setStep(1),
        setName(""),
        setOtp(""),
        setPhone("")
    }
    return(
        <SafeAreaView style={{padding:20,margin:"auto"}}>
            <FirebaseRecaptchaVerifierModal ref={recaptcha} firebaseConfig={auth.app.options}/>
                    
            {login==="login"?<Text style={styles.header}>Login</Text>:<Text style={styles.header}>SignIn</Text>}
            {step===1&&(
                <View style={styles.intial}>
                    {login==="signin"&&(
                        <TextInput style={styles.inputs} value={name} onChangeText={(value)=>setName(value)} placeholder="Enter Your Name"/>
                    )}
                    <TextInput style={styles.inputs} 
                    keyboardType="phone-pad"
                    value={phone} onChangeText={setPhone} placeholder="Enter Your Phone number"/>
                    <TouchableOpacity style={{borderWidth:2,margin:"auto",borderRadius:20,
                    padding:10,
                    backgroundColor:"#eef",
                    elevation:5
                    }} onPress={()=>sendOtp()} >
                        <Text>Send Otp</Text>
                    </TouchableOpacity>
                </View>
            )}
            {step===2&&(
                <View>
                    <TextInput style={styles.inputs} 
                    keyboardType='numeric'
                    placeholder="Enter Otp" value={otp} onChangeText={(value)=>setOtp(value)}></TextInput>
                    <TouchableOpacity style={{borderWidth:2,margin:"auto",borderRadius:20,
                    padding:10,
                    backgroundColor:"#eef",
                    elevation:5
                    }} onPress={()=>verifyOtp()} >
                        <Text>Verify Otp</Text>
                    </TouchableOpacity>
                    <Text>Didn't receive otp? <TouchableOpacity  onPress={()=>alert("Please Re-login")}><Text style={{color:"#5DADEC",top:5}}>Resend Otp</Text></TouchableOpacity></Text>
                </View>
                
            )}
            <View style={{ marginTop:20,flexDirection:"row"}}>
                <View >
                {login==="login"?<Text>Didn't have an Account? </Text>:<Text>Already have an account? </Text>}
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{setLogin(login==="login"?"signin":"login"),reset()}}>
                        {login==="login"?<Text style={{color:"#5DADEC"}}>SignIn</Text>:<Text style={{color:"#5DADEC"}}>Login</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    header:{
        margin:"auto",
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10
    },
    intial:{

    },
    inputs:{
        marginBottom:20,
        borderBottomWidth:2,
        borderRadius:10,
        fontSize:20
    }
})
export default SignIn;