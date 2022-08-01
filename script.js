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
  

/*
------------Sorting-------------
*/



    var compare = { 
        name: function(a, b) { 
            a = a.replace(/^the /i, ''); 
        b = b.replace(/^the /i, ''); 
        if (a < b) { 
            return -1; 
        } else { 
        return a > b ? 1 : 0;
        }
        },
        date: function(a, b) { 
            a = new Date(a);
            b = new Date(b); 
            return a - b; 
        }
        }
        $('.sortable').each(function() {
            var $table = $(this); 
            var $tbody = $table.find('tbody'); 
            var $controls = $table.find('th'); 
            var rows = $tbody.find('tr').toArray(); 
            $controls.on('click', function() { 
                var $header = $(this); 
            
        var order = $header.data('sort'); 
        var column;
        if ($header.is('.ascending') || $header.is('.descending')) { 
            $header.toggleClass('ascending descending');
            
            $tbody.append(rows.reverse());
            } else {
                $header.addClass('ascending'); 
    $header.siblings().removeClass('ascending descending'); 
    if (compare.hasOwnProperty(order)) {
    column = $controls.index(this); 
    rows.sort(function(a, b) { 
        a = $(a).find('td').eq(column).text();
        b = $(b).find('td').eq(column).text();
        return compare[order](a, b); 
    });
    $tbody.append(rows);}
    }
            });
    })
    
                                          


});

    
    
