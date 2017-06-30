
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBLrs0mH70ANVdUcDehx4nR7SBqgetRgd0",
    authDomain: "jf-train-schedule.firebaseapp.com",
    databaseURL: "https://jf-train-schedule.firebaseio.com",
    projectId: "jf-train-schedule",
    storageBucket: "jf-train-schedule.appspot.com",
    messagingSenderId: "215250080002"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    // GLOBAL VARIABLES
      var newTrainName = "";
      var newTrainDest = "";
      var newFirstTrain = 0;
      var newTrainFreq = 0;

    

    // BUTTON TO ADD NEW TRAIN
      $(document).on("click", "#new-train-btn", function(event) {

        event.preventDefault();
        // database.ref().push({
        //   name: "jerome"
        // })
        // console.log(database.ref())
    
      // GRAB USER INPUT

        var newTrainName = $("#train-name-input").val().trim();
        var newTrainDest = $("#destination-input").val().trim();
        var newFirstTrain = $("#first-time-input").val().trim();
        var newTrainFreq = $("#frequency-input").val().trim();

        var firstTrainMilitary = moment(firstTrainTime, "HH:mm");

          console.log("New Name: " + newTrainName);
          console.log("New Dest: " + newTrainDest);
          console.log("New First Time: " + firstTrainMilitary);
          console.log("New Freq: " + newTrainFreq);

      // TEMP OBJ FOR NEW TRAIN DATA

      var newTrain = {
        name: newTrainName,
        destination: newTrainDest,
        first: newFirstTrain,
        frequency: newTrainFreq 
      }


      // // UPDATE FIREBASE W/ NEW TRAIN INFO
      database.ref().push(newTrain);

      // CONSOLE LOG NEW TRAIN INFO
      // console.log("Train Name: " + newTrain.name);
      // console.log("Destinatnion: " + newTrain.destiantion);
      // console.log("First Time: " + newTrain.first);
      // console.log("Frequency: " + newTrain.frequency);

      // CLEAR TEXT-BOXES
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("")

      }); // on click function close


    // UPDATE HTML W/ NEW TRAIN INFO
      database.ref().on("child_added", function(childSnapshot) {

        // STORE FIREBASE DATA IN VAR
          var trainName = childSnapshot.val().name;
          var trainDest = childSnapshot.val().destination;
          var firstTrain = childSnapshot.val().first;
          var trainFreq = childSnapshot.val().frequency;

            // CONSOLE LOG NEW TRAIN INFO PUSHED TO HTML
              console.log("Name HTML: " + trainName);
              console.log("Dest HTML: " + trainDest);
              console.log("Time HTML: " + firstTrain);
              console.log("Freq HTML: " + trainFreq);

            // MAKE NEXT ARRIVAL & ETA PRETTY
            var currentTime = moment();
            console.log(moment(currentTime).format("HH:mm"));

            var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

            // DIFFERENCE TIME (FIRST TRAIN TIME - CURRENT TIME)
            var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("Difference in Time: " + timeDiff);

            // TIME APPART
            var remainder = timeDiff % trainFreq;
            console.log("Remiander: " + remainder);

            // MIN UNTIL NEXT TRAIN (FREQ - REMIANDER)
            var minUntilTrain = firstTrain + trainFreq - remainder;
            console.log("Min Until Next Train: " + minUntilTrain);

            // ETA NEXT TRAIN (CURRENT TIME + Min UNTIL NEXT)
            var trainETA = moment().add(minUntilTrain, "minutes").format("HH:mm");
            console.log("ETA Next Arrival: " + moment(trainETA).format("HH:mm"));



        // ADD NEW TRAIN DATA TO TABLE
        $("#schedule-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + firstTrain +  "</td><td>" + trainFreq + "</td><td>" + moment(trainETA).format("HH:mm") + "</td></tr>");

      }); // database pull function close



    // REFRESH TRAIN DATA EVERY 3min
    setInterval(function() {
      location.reload();

    }, 1800000);







