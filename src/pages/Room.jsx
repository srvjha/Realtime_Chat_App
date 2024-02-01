import React from 'react'
import authservice from '../appwrite/config'
import {useState,useEffect} from 'react'
import conf from '../conf/conf.js'
import {Trash2,Send} from 'react-feather'
import Header from '../components/Header.jsx'
import { useAuth } from '../utils/AuthContext.jsx'
import { Permission, Role } from 'appwrite'

const Room = () => {
    const [messages,setMessages] = useState([])
    const [messageBody,setMessageBody] = useState("")
    const{user} = useAuth()

    useEffect(()=>{
        messagedata()
       const unsubscribe= authservice.client.subscribe(`databases.${conf.appwriteDatabaseID}.collections.${conf.appwriteCollectionID}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            console.log("Realtime : ",response);
            if(response.events.includes("databases.*.collections.*.documents.*.create",))
            {   
                setMessages((prevMessages) => [ response.payload,...prevMessages]);
                console.log("Message Created")
            }
            if(response.events.includes("databases.*.collections.*.documents.*.delete",))
            {
                setMessages((prevMessages)=>prevMessages.filter((message)=>message.$id!=response.payload.$id));
                console.log("Message Deleted")
            }
        });

        return ()=>{
            unsubscribe()
        }
    },[])

    const messagedata = async()=>{
       const response = await authservice.getMessages()
      
       console.log(response)
       setMessages(response.documents)
    }
    const data = async (myData) => {
        let permissions = [
            Permission.write(Role.user(user.$id))
        ]
        try {
            const response = await authservice.createmessage({
                 ...myData, 
                 body: messageBody,
                 userid:user.$id,
                 username:user.name,
                 permissions
                 });
            console.log(response);
            return response; // Return the response from the function
        } catch (error) {
            console.error("Error creating message:", error);
            // Handle the error if needed
            return null; // Return null in case of an error
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await data(); // Capture the response
        if (response) {
            //setMessages((prevMessages) => [ response,...prevMessages]);
            setMessageBody('');
        }
    };

    const deleteMessage = async(message_id)=>{
        await authservice.deletemessage(message_id);
       
        //setMessages((prevMessages)=>prevMessages.filter((message)=>message.$id!=message_id));
    }
    
  return (
    <main className='container'>
        <Header/>
       <div className='room--container'>
       
        <form onSubmit={handleSubmit} id='message--form' >
           
            <div>
                <textarea
                required
                maxLength='1000'
                placeholder='Type Something...'
                onChange={(e)=>setMessageBody(e.target.value)}
                value={messageBody}
                ></textarea>
            </div>
            <div className='send-btn--wrapper'>
            <button type="submit" value="Send" >
                <Send className='send-btn'/>
            </button>
            </div>
            

        </form>



        <div>{messages.map((message)=>(
            <div key={message.$id} className='message--wrapper'>
               
                <div className='message--header'>
                    <p>
                        {message?.username?(
                             <span> {message?.username}</span>
                        ):(
                            <span>Anonymous user</span>
                        )}
                    <small className='message-timestamp'>Messaged At:- {new Date(message.$createdAt).toLocaleString()}</small>
                    </p>
                
                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
                </div>
               
                <div className='message--body'>
                      <span>{message.body}</span>
                </div>
                
               
               
            </div>
        ))}
        </div>
        </div>

    </main>
  )
}

export default Room