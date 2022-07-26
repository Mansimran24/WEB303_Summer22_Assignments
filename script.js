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
            $row.append($('<td></td>').text(val.dob));

            $tbody.append($row);

            cache.push({ 
                element: $row, 
                fname: val.name.trim().toLowerCase(),
                ncharacter: val.character.trim().toLowerCase().charAt(0)
            });

            if ("a" <= val.character.trim().toLowerCase().charAt(0) && "m" >= val.character.trim().toLowerCase().charAt(0)) {
                characterCount[0]++; 
            } else { // n - z
                characterCount[1]++; 
            }
        });

        
        $('<button/>', { 
            text: 'A - M (' + characterCount[0] + ')', 
            click: function() {
                $(this) 
                    .addClass('active') 
                    .siblings() 
                    .removeClass('active'); 
                cache.forEach((characters) => { 
                    if ("a" <= characters.ncharacter && "m" >= characters.ncharacter) {
                        characters.element.show();
                    } else { 
                        characters.element.hide();
                    }
                });

            }
        }).appendTo($buttons); 

        $('<button/>', { 
            text: `N - Z (${characterCount[1]})`, 
            click: function() { 
                $(this) 
                    .addClass('active') 
                    .siblings()
                    .removeClass('active');
                cache.forEach((characters) => { 
                    if ("n" <= characters.ncharacter && "z" >= characters.ncharacter) {
                        characters.element.show();
                    } else {
                        characters.element.hide();
                    }
                });
            }
        }).appendTo($buttons); 

    });


    function filter() {
        var query = this.value.trim().toLowerCase(); 
        if (query) { 
            cache.forEach(function(characters) { 
                var index = 0; 
                index = characters.fname.indexOf(query); 
                if (index != -1) { 
                    characters.element.addClass("active"); 
                } else { 
                    characters.element.removeClass("active")
                }
            });
        } else { 
            $('tbody tr').removeClass("active");
        }
    }
    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    } else { 
        $search.on('keyup', filter);
    }

});
