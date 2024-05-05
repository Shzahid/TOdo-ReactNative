import { View, Text ,Button, StyleSheet} from 'react-native'
import React from 'react'
import { FIRE_BASE_AUTH } from '../Firebase'


const Logout = () => {
  return (
    <View style={styles.Flexing}>
            <Text style={styles.heading}>Contacts</Text>
           <View style={{ flex: 1 }} /> 
          <Button onPress={() => FIRE_BASE_AUTH.signOut()} title='LogOut' />
</View>
  )
}

const styles= StyleSheet.create({
    heading:{
        fontSize:24,
        fontWeight:"bold",
        paddingHorizontal:8,
        color:'black'
    },
    Flexing:{
        // flex:1,
         flexDirection: 'row',
         justifyContent:'space-between',
       //  alignItems:'center',
         marginHorizontal:1,
         paddingHorizontal:4,
         margin: 5
         
 
 
     }
})

export default Logout