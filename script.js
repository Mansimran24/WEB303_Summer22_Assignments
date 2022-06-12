// Assignment 2
// Mansimran Kaur
$(document).ready(function () {
  $("#prospect").on("click", function () {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "prospect.html", true);

    xhr.onload = function () {
      if (xhr.status == 200) {
        let pp = document.getElementById("content");
      pp.style.display = "block";
        pp.innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  });
  $("#convert").on("click", function () {
      let xhr = new XMLHttpRequest();
  
      xhr.open("GET", "convert.html", true);
  
      xhr.onload = function () {
        if (xhr.status == 200) {
          let cv = document.getElementById("content");
          cv.style.display = "block";
          cv.innerHTML = xhr.responseText;
        }
      };
      xhr.send();
    });
    $("#retain").on("click", function () {
      let xhr = new XMLHttpRequest();
  
      xhr.open("GET", "retain.html", true);
  
      xhr.onload = function () {
        if (xhr.status == 200) {
          let rt = document.getElementById("content");
          rt.style.display = "block";
          rt.innerHTML = xhr.responseText;
        }
      };
      xhr.send();
    });

  
});
