import React,{useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
import { ContactList } from '../screens/ContactList';
import { onAuthStateChanged } from 'firebase/auth';
import { FIRE_BASE_AUTH } from '../Firebase';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout () {
    return(
      
        <InsideStack.Navigator>
          <InsideStack.Screen name='ContactList' component={ContactList}  />
        </InsideStack.Navigator>
    )
  }

  const Navigation = () => {
    const [user, setUser] = useState(null)
  
    useEffect(() => {
     const subscribe = onAuthStateChanged(FIRE_BASE_AUTH,(user)=>{
        console.log(user , 'user')
        setUser(user)
  
  
      })
      return subscribe;
    
     
    }, [])
    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'InsideLayout' : 'Login'}>
          {user ? (
            <Stack.Screen name='InsideLayout' component={InsideLayout} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default Navigation;