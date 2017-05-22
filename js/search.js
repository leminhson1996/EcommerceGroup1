function productTemplate(product) {
	//alert(product.price);
	//+'<li><span class="color"> </span></li>'
	return '<div class="item col-lg-4 col-md-4 col-sm-5 col-xs-12" >'
					+'<div class=" box-in">'
						+'<div class=" grid_box">'
							 +'<a href="single.html?id='+product._id+'" > <img src="'+product.image_link+'" class="img-responsive" alt="">'
							 	+'<div class="zoom-icon">'
							 		+'<ul class="in-by">'
										+'<li><h5>Name:</h5></li>'                     
										+'<li><span>'+product.name+'</span></li>'
									+'</ul>'
									+'<ul class="in-by">'
										+'<li><h5>Sizes:</h5></li>'
										+'<li><span>'+product.size+'</span></li>'
									+'</ul>'
									+'<ul class="in-by-color">'
										+'<li><h5>colors: </h5></li>'
										+'<li>'+product.color+'</li>'
									+'</ul>'
								+'</div>'
							+'</a>'
		           		+'</div>'
						+'<div class="grid_1 simpleCart_shelfItem">'
							+'<a href="#" class="cup item_add"><span class=" item_price" >'+product.price+'$ <i> </i> </span></a>'
						+'</div>'
					+'</div>'
				+'</div>';
						//return '';
}




function getProductByFilter(){
	
	let size = $('input[name=size]:checked', '#filterForm').val();

	$.get("https://thawing-forest-86527.herokuapp.com/api/filter_product_by_size/"+ size,
		function(data, status) {
			showProducts(data);
			toogleActiveCategory("all_categories");
	});
	
}


function categoryTemplate(category) {
	return '<a href="#" class="list-group-item" id="'+category.name+'">'+category.name+'</a>';
}

function showProducts(data) {
	let result = $('#result');
		result.html('');
		data.forEach(function(product){
			let item = productTemplate(product);
			result.append(item);
	});
}

var prevActiveCategory = "all_categories";
function getProductByCategory() {
	//alert("Product Categories" + prevActiveCategory);
	if (prevActiveCategory === "all_categories") {
		$.get("https://thawing-forest-86527.herokuapp.com/api/get_all_products",
			function(data, status) {
				showProducts(data);
			});
	} else {
		$.get("https://thawing-forest-86527.herokuapp.com/api/filter_product_by_category/"+ prevActiveCategory,
			function(data, status) {
				showProducts(data);
			});
	}
}

function toogleActiveCategory(categoryName) {
	$('#'+prevActiveCategory).removeClass('active');
	$('#'+categoryName).addClass('active');
	prevActiveCategory = categoryName;
}


function updateCategoryList() {
	//alert("test123");
	$.get("https://thawing-forest-86527.herokuapp.com/api/all_categories",
		function(data, status) {
			//alert("Update categories list " + status);
			
			var categoriesList = '<a href="#" class="list-group-item active " id="all_categories">All Categories</a>';
			$(".list-group").html('').append(categoriesList);		
			$('#all_categories').click(function(){
				toogleActiveCategory('all_categories');
				getProductByCategory();
			});

			data.forEach(function(category){
				$(".list-group").append(categoryTemplate(category));
				$('#'+category.name).click(function(){
					toogleActiveCategory(category.name);
					getProductByCategory();
				});
			});

			

			
		});
}

$(document).ready(function(){
	//alert('hi123123');
	updateCategoryList();
	getProductByCategory();
	$('#searchByKeyword').submit(function(ev) {
	    ev.preventDefault(); // to stop the form from submitting
	    /* Validations go here */
	    let keyword = $('input[name=searchText]', '#searchByKeyword').val();
		//alert("keyword"+keyword);
		$.get("https://thawing-forest-86527.herokuapp.com/api/filter_product_by_name/"+ keyword,
			function(data, status) {
				toogleActiveCategory("all_categories");
				showProducts(data);
		});
	});
});