import { Text, StyleSheet, View ,TextInput,Button,TouchableOpacity, ActivityIndicator,Alert} from 'react-native'
import React,{useState}  from 'react'
import { FIRE_BASE_AUTH } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp = () =>{

  const navigation = useNavigation()

  const [email, setEmail] = useState('');
 // const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const auth = FIRE_BASE_AUTH;

  const signUp = async ()=>{
    setLoading(true)
    try {
      const responce = await createUserWithEmailAndPassword(auth,email, password);
      console.log(responce)
      Alert.alert( 'User created Successfully' ,'', [
        { text: 'OK' }
      ]);
      
    } catch (error) {
      console.log(error)
      Alert.alert('System Error' + error.message)
    } finally {
      setLoading(false)
    }
  }



    return(

      <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>

    
     
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        
      />
       
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      { loading ? <ActivityIndicator size={'large'} color="grey" />
      : <>
      <Button title="SignUp" onPress={() => signUp()} />
      </> }

      <TouchableOpacity style={styles.log}

      onPress={() => navigation.navigate('Login')
}>
   <Text style={styles.textfont}>Already have an Account Login!</Text>

      </TouchableOpacity>
      
    </View>
    )
}



const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  
},
title: {

  fontSize: 24,
  marginBottom: 20,
  color: "black"
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
error: {
  color: 'red',
  marginBottom: 10,
},
});

  
    
  


