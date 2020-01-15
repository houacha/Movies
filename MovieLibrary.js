(function ($) {
    var table = $("#movieTable");

    function ajax(type, info, htmlMethod) {
        $.ajax({
            url: 'https://localhost:44330/api/movies',
            dataType: 'json',
            type: type,
            contentType: 'application/json',
            data: info,
            success: htmlMethod,
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    function processForm(e) {
        var movie = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };
        ajax('post', JSON.stringify(movie),

            function (data, textStatus, jQxhr) {
                table.append(

                    function (i, value) {
                        table.append('<tr><td>' + movie.Title + '</td><td>' + movie.Genre + '</td><td>' + movie.Director + '</td></tr>');
                    })
            });
        e.preventDefault();
    }
    $('#my-form').submit(processForm);

    function makeTable() {
        ajax('get', null,

            function (data, textStatus, jQxhr) {
                $.each(data,
                    
                    function (i,value) {
                        table.append('<tr><td>' + value.Title + '</td><td>' + value.Genre + '</td><td>' + value.Director + '</td></tr>');
                    })
            })
    }
    document.getElementById("movieTable").innerHTML = makeTable();



})(jQuery);
