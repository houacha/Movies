var table = $("#movieTable");

function ajax(url, type, info, htmlMethod) {
    $.ajax({
        url: url,
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

(function ($) {

    function processForm(e) {
        var movie = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };
        ajax('https://localhost:44330/api/movies/', 'post', JSON.stringify(movie),
            function (data, textStatus, jQxhr) {
                table.append(
                    function (i, value) {
                        table.append('<tr><td>' + movie.Title + '</td><td>' + movie.Genre + '</td><td>' + movie.Director + '</td></tr>');
                    })
            });
        e.preventDefault();
    }
    $('#my-form').submit(processForm);
})(jQuery);

function edit() {
    var tble = document.getElementById("movieTable");
    for (var i = 0, row; row = tble.rows[i]; i++) {
        var movie = {
            Id: $("#id" + i).val(),
            Title: $("#tlt" + i).val(),
            Genre: $("#gnr" + i).val(),
            Director: $("#dir" + i).val()
        }
        ajax('https://localhost:44330/api/movies/' + movie.Id, 'put', JSON.stringify(movie),
            function (data, textStatus, jqXhr) {
            })
    }
}
(function ($) {
    function filter() {
        var searchedMovie;
        var tble = document.getElementById("movieTable");
        for (var i = 0, row; row = tble.rows[i]; i++) {
            searchedMovie.append({
                Id: $("#id" + i).val(),
                Title: $("#ttl" + i).val(),
                Genre: $("#gnr" + i).val(),
                Director: $("#dir" + i).val()
            })
        }
        table = "";
        $.each(searchedMovie,
            function (i, value) {
                table.append('<tr><td style="display:none;"><input type="text" id="id' + i + '" name="id" value="' + value.Id + '" /><td><input type="text" id="tlt' + i + '" name="title" value="' + value.Title + '" /></td><td><input type="text" id="gnr' + i + '" name="genre" value="' + value.Genre + '"></td><td><input type="text" id="dir' + i + '" name="director" value="' + value.Director + '"></td></tr>');
            })
    }
    $('#searchForm').submit(filter);
})(jQuery);

function makeTable() {
    ajax('https://localhost:44330/api/movies/', 'get', null,
        function (data, textStatus, jQxhr) {
            $.each(data,
                function (i, value) {
                    table.append('<tr><td style="display:none;"><input type="text" id="id' + i + '" name="id" value="' + value.Id + '" /><td><input type="text" id="tlt' + i + '" name="title" value="' + value.Title + '" /></td><td><input type="text" id="gnr' + i + '" name="genre" value="' + value.Genre + '"></td><td><input type="text" id="dir' + i + '" name="director" value="' + value.Director + '"></td></tr>');
                })
        })
}

makeTable();
