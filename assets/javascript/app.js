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


  

  function resetOnReload(){
    database.ref("/player1").set({
      player1Choice: ""
    });
    database.ref("/player2").set({
      player2Choice: ""
    });
    $("#player1Text").text("Select one:");
    $("#player2Text").text("Select one:");
  };


  function reset(){
    database.ref("/player1").set({
      player1Choice: ""
    });
    database.ref("/player2").set({
      player2Choice: ""
    });
    setTimeout(function(){
    $("#player1Text").text("Select one:");
    $("#player2Text").text("Select one:");
    $("#resultText").text("")}, 3000)
  };

  
  function compare(){
    if (player1Choice === "rock" && player2Choice === "rock") {
      $("#resultText").text("TIE!")
      reset();
    } else if (player1Choice === "paper" && player2Choice === "paper") {
      $("#resultText").text("TIE!")
      reset();
    } else if (player1Choice === "scissors" && player2Choice === "scissors") {
      $("#resultText").text("TIE!")
      reset();
    } else if (player1Choice === "scissors" && player2Choice === "rock") {
      $("#resultText").text("Player 2 Wins!")
      reset();
    } else if (player1Choice === "scissors" && player2Choice === "paper") {
      $("#resultText").text("Player 1 Wins!")
      reset();
    } else if (player1Choice === "rock" && player2Choice === "paper") {
      $("#resultText").text("Player 2 Wins!")
      reset();
    } else if (player1Choice === "rock" && player2Choice === "scissors") {
      $("#resultText").text("Player 1 Wins!")
      reset();
    } else if (player1Choice === "paper" && player2Choice === "rock") {
      $("#resultText").text("Player 1 Wins!")
      reset();
    } else if (player1Choice === "paper" && player2Choice === "scissors") {
      $("#resultText").text("Player 2 Wins!")
      reset();
    };
  };




  $(document.body).on("click", ".player1", function(){
    $(this).attr("data-status", "selected")
    let player1Selected = $(this).attr("data-value");
    database.ref("/player1").set({
      player1Choice: player1Selected
    });
    $("#player1Text").text("Player 1 has selected")

    $(".player1").not(this).each(function(){
      $(this).attr("data-status", "notSelected")
    });
  });

  $(document.body).on("click", ".player2", function(){
    $(this).attr("data-status", "selected")
    let player2Selected = $(this).attr("data-value");
    database.ref("/player2").set({
      player2Choice: player2Selected
    });
    $("#player2Text").text("Player 2 has selected")

    $(".player2").not(this).each(function(){
      $(this).attr("data-status", "notSelected")
    });
  });

  database.ref("/player1").on("value", function(snapshot){
    player1Choice = snapshot.val().player1Choice;
    compare();
    
  });

  database.ref("/player2").on("value", function(snapshot){
    player2Choice = snapshot.val().player2Choice;
    compare();
    
  });

  resetOnReload();

  