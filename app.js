


     var myName = prompt("Enter your name");


     function sendMessage() {
        // get message
        var message = document.getElementById("message").value;
 
        // save in database
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message
        });
 
        // prevent form from submitting
        return false;
    }





    // listen for incoming messages
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        var html = "";
        // give each message a unique ID
        html += "<li id='message-" + snapshot.key + "'>";
        // show delete button if message is sent by me
        if (snapshot.val().sender == myName) {
            html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                html += "Delete";
            html += "</button>";
           
        }
        html += snapshot.val().sender + ": " + snapshot.val().message;
        html += "</li>";
 
        document.getElementById("messages").innerHTML += html;
    });




    function deleteMessage(self) {
        // get message ID
        var messageId = self.getAttribute("data-id");
     
        // delete message
        firebase.database().ref("messages").child(messageId).remove();
    }
     
    // attach listener for delete message
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        // remove message node
        document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
    });

 function googleSignIn() {
    //  create google provider object
    var provider =new firebase.auth.GoogleAuthProvider();
    // login with popup window
    firebase.auth().signInWithPopup(provider).then(function (result){
    //    after successful login
    window.location="index1.html";
    var user = result.user;
    console.log("user===>")
    })

    
 }
        
