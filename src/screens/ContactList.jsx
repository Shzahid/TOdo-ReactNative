import { View , TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native'
import React  from 'react'
import Logout from '../components/Logout'
import Contacts from '../components/Contacts'
import { AddContacts } from '../components/AddContacts'

export const ContactList = () =>{

  
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>

            <View>
                
            <AddContacts />

            <Logout />

            </View>

            <View  style={{ flex: 1 }}>

              <ScrollView  vertical={true}  >

                <Contacts />

              </ScrollView>
            </View>

          </View>

        </TouchableWithoutFeedback>
      );
}




   
    



  
    
  


