$('.botones input[type="button"]').on("click", function() {
        let text = $(this).val();
        $('textarea').text($('textarea').text() + "\n" + text);
    });