import { Text, StyleSheet, View , ScrollView, Image,TouchableOpacity, Alert, TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Fire_store_DB } from '../Firebase'
import { getDocs,collection,onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'


const Contacts = () => {
    const [contacts, setContacts] = useState([])
    const [editingContact, setEditingContact] = useState(null);
    const [newPhone, setPhone] = useState('')
    const [newName, setName] = useState('')
    

    useEffect(() => {
        const getAllData = onSnapshot(collection(Fire_store_DB, 'users'), (snapshot) => {
          const fetchedContacts = [];
          snapshot.forEach((doc) => {
            fetchedContacts.push({ id: doc.id, ...doc.data() });
          });
          setContacts(fetchedContacts);
         
        });
        console.log(getAllData)
    
        return () => getAllData();
        
        
      }, []);

      const handleEdit = (contactId,name,phone) =>{
        setEditingContact(contactId)
        setName(name);
        setPhone(phone);
      }

      const handleUpdate = async(contactId,newName,newPhone) =>{
        try {
            await updateDoc(doc(Fire_store_DB,'users',contactId),{
                name: newName,
                phone: newPhone
            })
            setEditingContact(null);
            
        } catch (error) {
            console.error('Error updating contact:', error);
            
        }

      }


      const handledelete = async(id) =>{
        try {
            await deleteDoc(doc(Fire_store_DB,'users',id))
            Alert.alert('success', 'Contact deleted Successfully')
            
        } catch (error) {
            Alert.alert('faied', "SystemError" + error)
        }
      }
    
  return (
    <ScrollView style={styles.container} 
           horizontal={false}
           vertical={true}
            showsVerticalScrollIndicator={true}>
                
                {contacts.map(({id,name,phone,image})=>{
                    return (
                        <View key={id}  > 
                 
                {
                    editingContact === id ? (
                        <>
                         <View style={styles.userCard}>
                     {/* <Image  source={{   uri : image   }}   style={styles.userImage}   /> */}
                     <View style={{width:150}}>

                    <TextInput style={styles.input} 
                    value={newName}
                    onChangeText={(text) => setName(text)}
                    />
                    <TextInput style={styles.input}
                    value={newPhone}
                    onChangeText={(text) => setPhone(text)} />
                    </View>
                    <View style={{width:80}}>
                    <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleUpdate(id,newName,newPhone)}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                    </View>
                   </View>
                   

                        </>

                    )
                     : 
                    
                    (
                        <>
                  <View style={styles.userCard}>

                  
                     {/* <Image  source={{   uri : image   }}   style={styles.userImage}   /> */}
                     <View >
                    <Text style={styles.userName} >{name}</Text>
                    <Text style={styles.userphone} >{phone}</Text>
                    </View>
                    <View>
                    <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEdit(id,name,phone)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handledelete(id)}>
                  <Text style={styles.buttonText}>delete</Text>
                </TouchableOpacity>
                    </View>
                   </View>
                   



                  
                        </>

                    )
                }
                 

                    </View>
                    )
                    

                })}


            </ScrollView> 
  )
}
const styles = StyleSheet.create({
   
    container:{
        paddingHorizontal:16
    },
    userCard:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:3,
        padding:8,
        backgroundColor:'black',
        borderRadius:5,
        justifyContent:'space-between',
        
        

    },
    userImage:{
        width:60,
        height:60,
        borderRadius: 60/2,
        marginRight: 14
    },
    userphone:{
        fontSize:14,
        color:'white'

    },
    userName:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    button: {
        backgroundColor: '#3d89d0',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      input: {
        
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color:'white'
      },
})
export default Contacts