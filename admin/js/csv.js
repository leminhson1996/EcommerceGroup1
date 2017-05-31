var allCategory = {};

function updateCategoryList(){
    $.get("https://thawing-forest-86527.herokuapp.com/api/all_categories",
        function(data, status) {
            console.log("Update category list " + status);
            allCategory = data;
        }    
    );
}

function findCategoryByName(name){
    var result;
    allCategory.forEach(function(category){
        if (category.name == name) {
            result = category._id;
            return;
        }
    })
    return result;
}


function addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew){
    $.ajax({
        url: 'https://thawing-forest-86527.herokuapp.com/api/add_new_product/',
        type: 'PUT',
        data: JSON.stringify({
            name: nameNew,
            description: desNew,
            _category: findCategoryByName(categoryNew),
            image_link: imageSrc,
            color: colorNew,
            price: priceNew,
            size: sizeNew,
            brand: brandNew,
            sale_off: saleNew
        }),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            alert('This product has been added!!!');
            updateProductList();
            return;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            return;
        }
    });
}

$(document).ready(function(){
    updateCategoryList();

    $("#fileCSV").hide();
    $("#importCSVProducts").hide();

    $("#import-csv").bind("click", function() {
         $("#fileCSV").click();
    });

    $("input[type=file]").bind("change", function() {
        var selected_file_name = $(this).val();
        if ( selected_file_name.length > 0 ) {
            $("#importCSVProducts").click();
        }
    });


    $("#importCSVProducts").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileCSV").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\n");
                    for (var i = 1; i < rows.length; i++) {
                        var cells = rows[i].split(",");
                        
                        var nameNew = cells[0];
                        var desNew = cells[1];
                        var categoryNew = cells[2];
                        var imageSrc = cells[3];
                        var colorNew = cells[4];
                        var priceNew = cells[5];
                        var sizeNew = cells[6];
                        var brandNew = cells[7];
                        var saleNew = cells[8];
                      
                        addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew);
                    }
                }
                reader.readAsText($("#fileCSV")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });


    
});