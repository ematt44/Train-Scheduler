// Add code from firebase to link up


var config = {
    apiKey: "AIzaSyAECCxpUu0GACrg6X8NGPL-z0ceWDTRX20",
    authDomain: "the-polar-express.firebaseapp.com",
    databaseURL: "https://the-polar-express.firebaseio.com",
    projectId: "the-polar-express",
    storageBucket: "",
    messagingSenderId: "20098458901"
};
// Initialize firebase

firebase.initializeApp(config);

// Set variables to use firebase and moment 
// Make sure to use moment.js 



// Sound for "All Aboard" 
var audio = new Audio('all-ab-cut.mp3');
audio.play();

// Variables for database and current time

var database = firebase.database();
var currentTime = moment();


// Add a train to the database and html when the user adds a train

database.ref().on("child_added", function(childSnapshot) {
    
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var trainFrequency = childSnapshot.val().trainFrequency;
        var min = childSnapshot.val().min;
        var next = childSnapshot.val().next;

// Add each train's data to the table 

$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   

});


// Grab the data from the form

$("#addTrainBtn").on("click", function() {

    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

 // Play train horn sound when user clicks submit  
    
    var audio = new Audio('train-horn.mp3');
    audio.play();
    var hitByTrain = new Audio('hit-by-train.mp3');
    
    
    // If user does not enter input in one of the fields play sound for getting hit by train

    if (trainName == "") {
        var hitByTrain = new Audio('hit-by-train.mp3');
        hitByTrain.play();
        return false;
        
        
    }
    if (destination == "") {
        var hitByTrain = new Audio('hit-by-train.mp3');
        hitByTrain.play();
        return false;
    }
    if (firstTrain == "") {
        var hitByTrain = new Audio('hit-by-train.mp3');
        hitByTrain.play();
        return false;
    }
    if (trainFrequency == "") {
        var hitByTrain = new Audio('hit-by-train.mp3');
        hitByTrain.play();
        return false;
    }

    
   // First Time (pushed back 1 year to make sure it comes before current time)
    
    var firstTrainRecord = moment(firstTrain, "hh:mm").subtract(1, "years");
    
    // Set the difference between the current time and the first train
    
    var timeDifference = moment().diff(moment(firstTrainRecord), "minutes");

    // Get the leftover time until the next train arrives by using %
    // Format the time 

    var leftOver = timeDifference % trainFrequency;
    var minAway = trainFrequency - leftOver;
    var nextTrain = moment().add(minAway, "minutes").format("hh:mm a");

    //  Make a newTrain object 

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        trainFrequency: trainFrequency,
        min: minAway,
        next: nextTrain
    }

    database.ref().push(newTrain);
    
    // Assign the values to the id's in html

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
});



