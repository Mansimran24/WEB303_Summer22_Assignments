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
  
    var compare = { // Declare object
        name: function(a, b) { // Add name() method
        a = a.replace(/^the /i, ''); // Remove The
        b = b.replace(/^the /i, ''); // Remove The
        if (a < b) { // If a less than b
        return -1; // Return -1
        } else { // Otherwise
        // If a greater than b return 1 otherwise return 0
        return a > b ? 1 : 0; 
        }
        }, // More methods go here...
        date: function(a, b) { // Add a method called date
            a = new Date(a); // New object to hold date
            b = new Date(b); // New object to hold date
            return a - b; // Return a minus b
            },

            $('.sortable').each(function() {
                var $table = $(this); // This table
                var $tbody = $table.find('tbody'); // Table body
                var $controls = $table.find('th'); // Table headers
                var rows = $tbody.find('tr').toArray();
                 // Array of rows
                $controls.on('click', function() { // Event handler
                var $header = $(this); // Get header
                var order = $header.data('sort'); // Get data type
                var column;     
                });
            }),
            if ($header.is('.ascending') || $header.is('.descending'))
            { 
                // Toggle to other class
                $header.toggleClass('ascending descending'); 
                // Reverse the array
                $tbody.append(rows.reverse()); 
            } 
            else {

            }

                        
        }
      
                                          


});

    
    
