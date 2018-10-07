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
      player1Choice: "",
      player1Text: ""
    });
    database.ref("/player2").set({
      player2Choice: "",
      player2Text: ""
    });
    $("#player1Text").text("Select one:");
    $("#player2Text").text("Select one:");
  };

  function changeColor(){
    $('[data-value="'+ player1Choice+'"]').addClass("selectedBorder");
    $('[data-value="'+ player2Choice+'"]').addClass("selectedBorder");
    
  }


  function reset(){
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
    // $('[data-status="selected"]').removeClass("selectedBorder");
      $("#player1Text").text("Select one:");
      $("#player2Text").text("Select one:");
      $("#resultText").text("")
    }, 3500)
  };


  function compare(){
    if (player1Choice === "rock1" && player2Choice === "rock2") {
      $("#resultText").text("TIE!")
      changeColor();
      // $('[data-status="selected"]').addClass("selectedBorder");
      reset();
    } else if (player1Choice === "paper1" && player2Choice === "paper2") {
      $("#resultText").text("TIE!")
      changeColor();
      reset();
    } else if (player1Choice === "scissors1" && player2Choice === "scissors2") {
      $("#resultText").text("TIE!")
      changeColor();
      reset();
    } else if (player1Choice === "scissors1" && player2Choice === "rock2") {
      $("#resultText").text("Player 2 Wins!")
      changeColor();
      reset();
    } else if (player1Choice === "scissors1" && player2Choice === "paper2") {
      $("#resultText").text("Player 1 Wins!")
      changeColor();
      reset();
    } else if (player1Choice === "rock1" && player2Choice === "paper2") {
      $("#resultText").text("Player 2 Wins!")
      changeColor();
      reset();
    } else if (player1Choice === "rock1" && player2Choice === "scissors2") {
      $("#resultText").text("Player 1 Wins!")
      changeColor();
      reset();
    } else if (player1Choice === "paper1" && player2Choice === "rock2") {
      $("#resultText").text("Player 1 Wins!")
      changeColor();
      reset();
    } else if (player1Choice === "paper1" && player2Choice === "scissors2") {
      $("#resultText").text("Player 2 Wins!")
      changeColor();
      reset();
    };
  };




  $(document.body).on("click", ".player1", function(){
    $(this).attr("data-status", "selected")
    let player1Selected = $(this).attr("data-value");
    database.ref("/player1").set({
      player1Choice: player1Selected,
      player1Text: "Player 1 has selected"
    });

    $(".player1").not(this).each(function(){
      $(this).attr("data-status", "notSelected")
    });
  });

  $(document.body).on("click", ".player2", function(){
    $(this).attr("data-status", "selected")
    let player2Selected = $(this).attr("data-value");
    database.ref("/player2").set({
      player2Choice: player2Selected,
      player2Text: "Player 2 has selected"
    });

    $(".player2").not(this).each(function(){
      $(this).attr("data-status", "notSelected")
    });
  });

  database.ref("/player1").on("value", function(snapshot){
    player1Choice = snapshot.val().player1Choice;
    $("#player1Text").text(snapshot.val().player1Text);
    compare();
    
  });

  database.ref("/player2").on("value", function(snapshot){
    player2Choice = snapshot.val().player2Choice;
    $("#player2Text").text(snapshot.val().player2Text)
    compare();
    
  });

  resetOnReload();

  