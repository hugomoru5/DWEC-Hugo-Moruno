let textInput = $("#textInput");

$("#btnRojo").on("click", function() {
    let color = $(this).css("background-color");
    textInput.css("background-color", color);
});

$("#btnVerde").on("click", function() {
    let color = $(this).css("background-color");
    textInput.css("background-color", color);
});

$("#btnAzul").on("click", function() {
    let color = $(this).css("background-color");
    textInput.css("background-color", color);
});
