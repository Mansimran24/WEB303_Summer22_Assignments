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
            $row.append($('<td></td>').text(val.description));
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



var names = $('#name')
var $search = $('#search'); // Get input
var cache = [];
var $tableBody=$('tbody')
$.each(characters, function(key,val) { 

// Store current charcater
var $row = $('<tr></tr>'); // Create row for them
$row.append($('<td></td>').text(val.name)); // Add name
$row.append($('<td></td>').text(val.description)); // Add desvription
$row.append($('<td></td>').text(val.age));
$row.append($('<td></td>').text(val.dob));
$tableBody.append($row);

// Create array
// Each img
    cache.push({ // Add to cache
        element: $row, // This image
        name: val.name.trim().toLowerCase() // Its alt text
    });
});
function filter() {
    var query = this.value.trim().toLowerCase(); // Get query
    if (query) { // If there’s a query
        cache.forEach(function(characters) { // Each cache entry
            var index = 0; // Set index to 0
            index = characters.name.indexOf(query); // Is text in there?
            if (index != -1) { // we found the string in their first name
                characters.element.addClass("active"); // we will apply colours based on this class
            } else { // player first name doesn't have the query string, make sure it's not higlighted
                characters.element.removeClass("active")
            }
        });
    } else { // if the search is empty, nobody should be highlighted
        $('tbody tr').removeClass("active");
    }
}
// if the search input box supports the input event, we want to use it instead of the keyup event
if ('oninput' in $search[0]) {
    // Use input event to call filter()
    $search.on('input', filter);
} else { // Otherwise
    // Use keyup event to call filter()
    $search.on('keyup', filter);
}//Sorting
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
},
date: function(a, b) { // Add a method called date
    a = new Date(a); // New object to hold date
    b = new Date(b); // New object to hold date
    return a - b; // Return a minus b
}
}
$('.sortable').each(function() {
    var $table = $(this); // This table
    var $tbody = $table.find('tbody'); // Table body
    var $controls = $table.find('th'); // Table headers
    var rows = $tbody.find('tr').toArray(); // Array of rows
    $controls.on('click', function() { // Event handler
        var $header = $(this); // Get header
    
var order = $header.data('sort'); // Get data typevar column; 
if ($header.is('.ascending') || $header.is('.descending')) { // Toggle to other class
    $header.toggleClass('ascending descending');
    // Reverse the array
    $tbody.append(rows.reverse());
    } else {
        $header.addClass('ascending'); // Add class to header// Remove asc or desc from all other headers
$header.siblings().removeClass('ascending descending'); // If compare object has method of that name
if (compare.hasOwnProperty(order)) {
column = $controls.index(this); // Column’s index no
rows.sort(function(a, b) { // Call sort() on rows
a = $(a).find('td').eq(column).text();// Text of column row a
b = $(b).find('td').eq(column).text();// Text of column row b
return compare[order](a, b); // Call compare method
});
$tbody.append(rows);}
}
    });
})
                          


});

    
    
