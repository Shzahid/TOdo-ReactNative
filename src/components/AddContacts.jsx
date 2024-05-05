import { View, Text, TextInput, Alert, ActivityIndicator, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { Fire_store_DB } from '../Firebase';

export const AddContacts = () => {
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [loading, setLoading] = useState(false);

  const addDetails = async () => {
    
   if(name === '' && num === ''){
    setLoading(false);
    return(
      
      Alert.alert('failed', 'Enter All Fields ')
    )
   } else{
    setLoading(true);
    try {
      const useRef =  await addDoc(collection(Fire_store_DB, "users"), {
         name: name,
         phone: num
       });
       console.log(useRef.id, 'user')
       Alert.alert("Success", "Contact added Successfully");
       
       setName('');
       setNum('');
     } catch (error) {
       Alert.alert("Error", "Something went wrong. Please try again later." + error);
     } finally {
       setLoading(false);
     }
   }
  };

  return (
    <View style={styles.overView}>
      <Text style={styles.heading1}>AddContacts</Text>
      <View style={styles.nameC}>
        <Text  style={styles.heading} >Name</Text>
        {/* <View style={{ flex: 1 }} />  */}
        <TextInput style={styles.input} onChangeText={text => setName(text)} value={name} />
      </View>
      <View style={styles.nameC} >
        <Text style={styles.heading} >Number</Text>
        <TextInput style={styles.input} onChangeText={text => setNum(text)} value={num} keyboardType="numeric" />
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size={'large'} color="grey" />
        ) : (
          <Button title="Add Contact" onPress={() => addDetails()} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
    paddingHorizontal:100
  },
  overView:{
    
  },
  nameC:{
   // flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:5
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:"black"
  },
});
