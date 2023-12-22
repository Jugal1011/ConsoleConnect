 <div align='center'>

<h1>🚀 Real-Time-Chat-App ✨</h1>
<pre>Problem Statement: 
     Create a simple real-time chat application where users can join different chat rooms or create their own chat rooms. 
     Users should be able to send and receive messages in real-time. </pre>

<pre>Functional Requirements: 
1. Allow users to create/join chat rooms by entering a unique room ID. 
2. Enable users to send and receive messages in real-time within a chat room. 
3. Display a list of active users in the chat room. 
4. Implement a private messaging feature between users. 
5. Implement message history, so the chat persists even if the user leaves and rejoins.</pre>  

<pre>Key Focus: 
1. Behavioral Pattern: Use the Observer Pattern to notify clients of new messages or user activities.
2. Creational Pattern: Use Singleton to manage the state of the chat rooms.
3. Structural Pattern: Use the Adapter Pattern to allow the system to work with different types of client communication protocols (WebSocket, HTTP, etc.).
4. OOP: Apply encapsulation, polymorphism, and inheritance effectively.</pre>

<h2>Adding Client 1 And Sending Messages</h2>
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/26b1afa3-89b0-4e3c-bb52-c53f82b6eb4b">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/f72997b3-0a2d-43d0-a4f9-b6726de25dfd">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/20d44a19-f2a9-4c05-8557-68e1198f8486">
<h2>Adding Client 2 & 3 And Getting Chat History And Sending Messages</h2>
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/c6e2bccd-18a4-4af7-9949-50bbfc58a730">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/2779425c-11d5-4ba3-a406-dc8dbfab081c">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/02fb4d4c-8558-4266-b728-0429662b59fd">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/d48c6d0f-0760-4c50-83dd-129733ddf669">
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/fda89fe8-15bf-44aa-84f2-46188d8b07b6">

<h2>Handling The Usecase When User With Same Username Enters The Chatroom</h2>
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/50353b64-ca6b-461a-8218-d9fef183b420">

<h2>User Left Or Disconnect From Chatroom</h2>
<img src="https://github.com/Jugal1011/Real-Time-Chat-App/assets/115832122/2cecff08-bdd9-43e7-a8dd-ffde15fb2e43">


### :running: Run Locally

Clone the project

```bash
git clone https://github.com/Jugal1011/Real-Time-Chat-App.git
```
Install dependencies
```bash
npm install
```
Add clients
```bash
npm run client
```
