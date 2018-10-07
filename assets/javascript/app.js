  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUgvahFckKxxMO_xMyZorI6gK_Ev2prHs",
    authDomain: "rps-multiplayer-90e53.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-90e53.firebaseio.com",
    projectId: "rps-multiplayer-90e53",
    storageBucket: "rps-multiplayer-90e53.appspot.com",
    messagingSenderId: "262846376126"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var player1Choice;
  var player2Choice;
  var player1Wins;
  var player1Losses;
  var player2Wins;
  var player2Losses;

  
  //resets DOM and database on page reload
  function resetOnReload(){
    database.ref("/player1").set({
      player1Choice: "",
      player1Text: ""
    });
    database.ref("/player2").set({
      player2Choice: "",
      player2Text: ""
    });
    database.ref("/wins-losses").set({
      player1Wins: 0,
      player1Losses: 0,
      player2Wins: 0,
      player2Losses: 0
    });
    $("#player1Text").text("Select one:");
    $("#player2Text").text("Select one:");
    $("#player1Wins").text(player1Wins);
    $("#player1Losses").text(player1Losses);
    $("#player2Wins").text(player2Wins);
    $("#player2Losses").text(player2Losses);
  };

  //changes wins and losses in database
  function setWinsLosses(){
    database.ref("/wins-losses").set({
      player1Wins: player1Wins,
      player1Losses: player1Losses,
      player2Wins: player2Wins,
      player2Losses: player2Losses,
    });
  }

  //at end of each round, shows player selections, then hides selections, resets choices in database, resets text on page
  function endOfRound(){
    $('[data-value="'+ player1Choice+'"]').addClass("selectedBorder");
    $('[data-value="'+ player2Choice+'"]').addClass("selectedBorder");

    setTimeout(function(){
      $('[data-value="'+ player1Choice+'"]').removeClass("selectedBorder");
      $('[data-value="'+ player2Choice+'"]').removeClass("selectedBorder");
    }, 3000)

    setTimeout(function(){
      database.ref("/player1").set({
        player1Choice: "",
        player1Text: ""
      });
      database.ref("/player2").set({
        player2Choice: "",
        player2Text: ""
      });
    
      $("#player1Text").text("Select one:");
      $("#player2Text").text("Select one:");
      $("#resultText").text("")
    }, 3500)
  };


  //if, else if statements to determine winner of round
  function compare(){
    if (player1Choice === "rock1" && player2Choice === "rock2") {
      $("#resultText").text("TIE!")
      endOfRound();
    } else if (player1Choice === "paper1" && player2Choice === "paper2") {
      $("#resultText").text("TIE!")
      endOfRound();
    } else if (player1Choice === "scissors1" && player2Choice === "scissors2") {
      $("#resultText").text("TIE!")
      endOfRound();
    } else if (player1Choice === "scissors1" && player2Choice === "rock2") {
      $("#resultText").text("Player 2 Wins!")
      player2Wins++;
      player1Losses++;
      setWinsLosses();
      endOfRound();
    } else if (player1Choice === "scissors1" && player2Choice === "paper2") {
      $("#resultText").text("Player 1 Wins!")
      player1Wins++;
      player2Losses++;
      setWinsLosses();
      endOfRound();
    } else if (player1Choice === "rock1" && player2Choice === "paper2") {
      $("#resultText").text("Player 2 Wins!")
      player2Wins++;
      player1Losses++;
      setWinsLosses();
      endOfRound();
    } else if (player1Choice === "rock1" && player2Choice === "scissors2") {
      $("#resultText").text("Player 1 Wins!")
      player1Wins++;
      player2Losses++;
      setWinsLosses();
      endOfRound();
    } else if (player1Choice === "paper1" && player2Choice === "rock2") {
      $("#resultText").text("Player 1 Wins!")
      player1Wins++;
      player2Losses++;
      setWinsLosses();
      endOfRound();
    } else if (player1Choice === "paper1" && player2Choice === "scissors2") {
      $("#resultText").text("Player 2 Wins!")
      player2Wins++;
      player1Losses++;
      setWinsLosses();
      endOfRound();
    };
  };



  //sets database value for player 1 selection
  $(document.body).on("click", ".player1", function(){
    let player1Selected = $(this).attr("data-value");
    database.ref("/player1").set({
      player1Choice: player1Selected,
      player1Text: "Player 1 has selected"
    });
  });

  //sets database value for player 2 selection
  $(document.body).on("click", ".player2", function(){
    let player2Selected = $(this).attr("data-value");
    database.ref("/player2").set({
      player2Choice: player2Selected,
      player2Text: "Player 2 has selected"
    });
  });

  //sets player 1 choice when database changes, updates text of page, and runs comparison function to determine winner 
  database.ref("/player1").on("value", function(snapshot){
    player1Choice = snapshot.val().player1Choice;
    $("#player1Text").text(snapshot.val().player1Text);
    compare();
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  //sets player 1\2 choice when database changes, updates text of page, and runs comparison function to determine winner
  database.ref("/player2").on("value", function(snapshot){
    player2Choice = snapshot.val().player2Choice;
    $("#player2Text").text(snapshot.val().player2Text)
    compare();
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  //updates win/loss local variables and updates text on page when win or loss database changes
  database.ref("/wins-losses").on("value", function(snapshot){
    player1Wins = snapshot.val().player1Wins;
    player1Losses = snapshot.val().player1Losses;
    player2Wins = snapshot.val().player2Wins;
    player2Losses = snapshot.val().player2Losses;

    $("#player1Wins").text(player1Wins);
    $("#player1Losses").text(player1Losses);
    $("#player2Wins").text(player2Wins);
    $("#player2Losses").text(player2Losses);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  //resets page on reload
  resetOnReload();

  