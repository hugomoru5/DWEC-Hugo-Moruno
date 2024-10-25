$('input[type="button"]').each(function() {
    $(this).on("click", function() {
        let color = $(this).css('background-color');
        $('#textInput').css('background-color', color);
    });
});