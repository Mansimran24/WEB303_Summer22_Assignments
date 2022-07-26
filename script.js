
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
            } else {
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
        var compare = {
            name: function(a, b) {
                console.log("processing the words", b, ", ", a);
                if (a < b) {
                    return -1;
                } else if (b < a) {
                    return 1
                } else 
                {
                    return 0;
                }
            },
            dob: function(a, b) {
                console.log("processing the numbers", b, ", ", a);
                return parseInt(a) - parseInt(b);
            },
            dob: function(a, b) {
                console.log("processing the numbers", b, ", ", a);
                return b - a;
            },
            compareNumbersRandom: function(a, b) {
                return 0.5 - Math.random();
            },
            compareDates: function(a, b) {
                var dateA = new Date(a);
                var dateB = new Date(b);
                return dateA - dateB;
            }
        };




        $('.sortable').each(function() {
            let $table = $(this);
            let $tbody = $table.find('tbody');
            let $controls = $table.find('th');
            let rows = $tbody.find('tr').toArray();

            $controls.on('click', function() {
                let $header = $(this);
                let order = $header.find("a").data('sortbythis');
                console.log("order control, ", order);
                let column;
                if ($header.is('.descending')) {
                    $header.removeClass('ascending descending');
                    $header.siblings().removeClass('ascending descending');
                } else if ($header.is('.ascending')) {
                    $header.toggleClass('ascending descending');
                    //revese array
                    $tbody.append(rows.reverse());
                } else {
                    $header.addClass('ascending'); 
                    $header.siblings().removeClass('ascending descending');
                    if (compare.hasOwnProperty(order)) {
                        console.log("has property");
                        column = $controls.index(this); 
                        rows.sort(function(a, b) { 
                            a = $(a).find('td').eq(column).text(); 
                            b = $(b).find('td').eq(column).text(); 
                            return compare[order](a, b); 
                        });
                        $tbody.append(rows);
                    }
                }
            })
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



});