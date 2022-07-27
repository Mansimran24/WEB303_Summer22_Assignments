$(function() {

    var $tbody = $('tbody'); 
    var $search = $('#search');
    var cache = [];
    var characterCount = [0, 0]; 
    var $buttons = $('#buttons'); 


    $.getJSON("kapilshow.json").done((data) => {

        $.each(data.kapilshow, function(key, val) {
            console.log("data key: ", key, " and data value: ", val);

            var $row = $('<tr></tr>'); 
            $row.append($('<td></td>').text(val.name));
            $row.append($('<td></td>').text(val.character));
            $row.append($('<td></td>').text(val.age));
            $row.append($('<td></td>').text(val.date));

            $tbody.append($row);

            cache.push({ 
                element: $row, 
                fname: val.name.trim().toLowerCase(),
                ncharacter: val.character.trim().toLowerCase().charAt(0)
            });

        });
    }); 
    



});
