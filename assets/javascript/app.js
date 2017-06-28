
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

    // BUTTON TO ADD NEW TRAIN
      $(document).on("click", "#new-train-btn", function() {
    
      // GRAB USER INPUT
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainFirstTime = moment($("first-time-input").val().trim(), "HH:mm");
      var trainFreq = $("frequency-input").val().trim();

          console.log(trainName);
          console.log(trainDest);
          console.log(trainFirstTime);
          console.log(trainFreq);

      // TEMP OBJ FOR NEW TRAIN DATA
      var newTrain = {
        name: trainName,
        destination: trainDest,
        first_train_time: trainFirstTime,
        frequency: trainFreq 
      }

      // UPDATE FIREBASE W/ NEW TRAIN INFO
      database.ref().push(newTrain);

      // CONSOLE LOG NEW TRAIN INFO
      console.log(newTrain.name);
      console.log(newTrain.destiantion);
      console.log(newTrain.first_train_time);
      console.log(newTrain.frequency);

      // CLEAR TEXT-BOXES
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("first-time-input").val("");
      $("frequency-input").val("")



      })





    


    


    


    // UPDATE HTML W/ NEW TRAIN INFO


    // CLEAR SCHEDULE & RETRIEVE TRAINS FROM FIREBASE


    // MAKE DESITNATION TIME PRETTY


    // MAKE NEXT ARRIVAL & ETA PRETTY








