import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { ResizeMode, Video } from 'expo-av';
import { useVideoPlayer } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardComponent from '../component/cardComponent';
const videoSource =require("../../assets/vedio/backgroundVedio.mp4");

//
type Item = {
  id: number;
  name: string;
  price: string;
  size:string;
  image:any;
  Quantity:number;
};


export default function Home() {
  const player = useVideoPlayer(videoSource, player => {
    player.muted=true;
    player.loop = true;
    player.play();
  });
  const items: Item[] = [
  {
    id: 1,
    name: "item1",
    // description: "is",
    price: "20,30",
    size:"m,xl",
    Quantity:20,
    image:"https://imgs.search.brave.com/qn3qgZQRXTxZDbt9H5xu8qTiBS1XJAXJlJOnEw0kWFo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA1/NjI1Mjk0L3Bob3Rv/L2luZHVzdHJpYWwt/Z2FzZXMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWFxYXp6/UjFBdERYcGl3a0lQ/RkY2U0pScW94dXMt/U0NiUWo5Q3dmS3NN/eGM9",
  },
  {
      id:2,
      name:"item2",
      price:"40,50",
      size:"m,xl",
      // image:"image"
      Quantity:30,
      image:"https://imgs.search.brave.com/25fojRUsFBbq5DVUd9-d895W99cjCygjG6d4NlY98Wc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ib2x0/b24tdGVjaC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDUvYWxsb3ktU3Rl/ZWwtQnV0dGVyZmx5/LVZhbHZlLTIucG5n",
    },
    {
      id:3,
      name:"item3",
      price:"40,50",
      size:"m,xl",
      // image:"image"
      Quantity:30,
      image:"https://imgs.search.brave.com/PVs-mf4ogdhXvIpVgXOdQRhzwSH0vh2J_nhGoBkAHrw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3Ivbm8yLW5p/dHJvZ2VuLWRpb3hp/ZGUtZ2FzLWljb24t/MjYwbnctMjEwNzU1/MjQ0OC5qcGc",
    }
];
 
  return (

    <SafeAreaView style={{flex:1,padding:15}}>
      
      {/* <VideoView style={styles.videoView} 
       contentFit="fill" player={player}
        allowsFullscreen={false}
         allowsPictureInPicture
         nativeControls={false}
          /> */}
      <View style={{flex:1}}
      >
        <View id='Heading'>
          <Text style={{margin:"auto",fontStyle:"italic",fontWeight:"600",fontSize:20}}>Home</Text>
          <Text style={{margin:"auto",padding:10}}>Please Order a Product</Text>
        </View>
        <View>
          <FlatList keyExtractor={(item)=>item.id.toString()}
          //  ListHeaderComponent={<CardComponent key={items.id} {...items} />} not here it should be in render componentss 
           data={items} renderItem={({item})=><CardComponent key={item.id} {...item}/>}
           numColumns={2}
            // style={{flex:1,gap:10,flexDirection:"column"}}
           >

          </FlatList>
          {/* {items.map(item => (
        <CardComponent key={item.id} {...item} />
      ))} */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  videoView:{    
    width:"100%",
    position:"absolute",
    top:0,
    left:0,
    bottom:0,
    right:0,
    height:"200%",
    zIndex:-1,
    overflow:"hidden",
  },
  restdata:{
    flex:1,
    borderWidth: 2,
      borderColor: 'red',
  borderRadius: 8,
  borderStyle: 'dotted',
  padding: 10
  }
});
