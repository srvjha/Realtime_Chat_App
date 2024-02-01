import conf from "../conf/conf.js";
import {Client,ID,Storage,Databases,Query} from "appwrite"

export class Service{
    client  = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
        
    }

    async createmessage({body,userid,username}) {
        try {
             return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                ID.unique(),
               {
                body,
                userid,
                username
               }
             )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async getMessages(queries=[Query.orderDesc("$createdAt")]){
        try {
           return await this.databases.listDocuments(
               conf.appwriteDatabaseID,
               conf.appwriteCollectionID,
               queries,
   
           )
        } catch (error) {
           console.log("Appwrite serive :: getPosts :: error", error)
           return false;
        }
       }
    
       async deletemessage(message_id){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                message_id
                              
            )
            return true
        } catch (error) {
            console.log("Error ho gya bhai",error)
            return false;
        }
    }
    
}


const authservice  = new Service()


export default authservice