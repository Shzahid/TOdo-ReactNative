import { Text, StyleSheet, View ,TextInput,Button, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIRE_BASE_AUTH } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';



 export const Login = () => {

  const navigation = useNavigation()
  

  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const auth = FIRE_BASE_AUTH;

  const signIn = async ()=>{
    setLoading(true)
    try {
      const responce = await signInWithEmailAndPassword(auth,email,password);
      console.log(responce)
     Alert.alert( 'Login Successfully' ,'', [
        { text: 'OK', onPress: () => navigation.navigate('ContactList') }
      ]);
      
    } catch (error) {
      console.log(error)
      Alert.alert('login Failed user not Found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
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

      { loading ? <ActivityIndicator size={'large'} color="black" />
      : <>
      <Button title="Login" onPress={() => signIn()} />
      </> }
      

      <TouchableOpacity style={styles.log}

      onPress={() => navigation.navigate('SignUp')
}>
   <Text style={styles.textfont}>Dont have an Account SignUp!</Text>

      </TouchableOpacity>
      
    </View>
  );
};

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
  textfont: {
    color: 'grey',
    marginTop: 5,
    fontWeight:'bold'
  },

});

  
    
  


