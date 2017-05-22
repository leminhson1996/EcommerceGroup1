var allUser ={};
var allProduct = {};
var allCategory = {};
var allOrder = {};
var addProductOrEdit;
var productName;
var imageSrc=null;


var docCookies = {
    getItem: function (cname) {
        if (!cname) {
            return null;
        }
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
};

var token = "?token=" + docCookies.getItem('access-token');

$(document).ready(function(){
    //if not an admin, can't access admin page
    $.ajax({
        url: 'https://thawing-forest-86527.herokuapp.com/api/users/username?token=' + docCookies.getItem('access-token'),
        type: 'POST',
        data: JSON.stringify({"username": docCookies.getItem('username')}),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        credentials: 'include',
        success: function(result) {
            console.log(result);
            $('.user-name > p').text(result[0].username);
            if (result[0].role !== "admin"){
                alert("Must be and admin to access this page");
                document.location.href = '../sign-up-login-form/login.html';
            }
        },
        error: function () {
            alert("Login as admin to access this page");
            document.location.href = '../sign-up-login-form/login.html';
        }
    });

    $('#logout').click(function (event) {
        event.preventDefault();
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        document.location.href = '../sign-up-login-form/login.html';
    });

    var token = docCookies.getItem('access-token');
    if (token){
        $("#user-name").text(docCookies.getItem('username'));
        $("#login").hide();
        $("#register").hide();
    }
    else{
        $("#user-name").text('Guest');
        $("#logout").hide();
        $("#user-name").hide();
    }
});

function show(){
		//window.location.href = "/admin/add-product.html";
		$(".product-table").addClass("col-lg-6");
		// $(".table").addClass("form-left");
		$(".form-edit").removeClass("edit-product-hidden");
		$(".form-edit").addClass("edit-product-visible");
		$(".form-edit").addClass("col-lg-6");

	};
function hide(){
		//window.location.href = "/admin/add-product.html";
		$(".product-table").removeClass("col-lg-6");
		// $(".table").addClass("form-left");
		$(".form-edit").addClass("edit-product-hidden");
		$(".form-edit").removeClass("edit-product-visible");
		$(".form-edit").removeClass("col-lg-6");
	};
function updateAdminList() {
	$.get("https://thawing-forest-86527.herokuapp.com/api/users"+token,
		function(data, status) {
		console.log("Update admin list " + status);
		$("#member-list").html("");
        var memberCount=1;
        allUser = data;

		data.forEach(function(user){
			if (user.role=='admin') {
                $("#member-list").append(
                    '<tr>'+
                    '<td>'+memberCount+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.name+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td><span class="label label-primary">Admin</span></td>'+
                    '<td><button class="delete-role btn btn-danger btn-sm">Delete</button>'+
                    '<td><button class="delete-admin-role btn btn-success btn-sm">Set to member</button></td></tr>');
			} else {
                $("#member-list").append(
                    '<tr>'+
                    '<td>'+memberCount+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.name+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td><span class="label label-warning">Member</span></td>'+
                    '<td><button class="delete-role btn btn-danger btn-sm">Delete</button></td></tr>');
			}

            memberCount++;
		});
		updateMemberBtn();
	});
};
function updateMemberBtn() {
    $(".delete-role").click(function() {
        var thisBtn = this;
        allUser.forEach(function(user) {
            if (user.username == $(thisBtn).parent().parent().children().eq(1).text() ){
                $.ajax({
                    url: 'https://thawing-forest-86527.herokuapp.com/api/users/'+user._id+token,
                    type: 'DELETE',
                    success: function(result) {
                        alert('Đã xóa user');
                        updateAdminList();
                        return false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return false;
                    }
                });
            }
        });
    });

    $(".delete-admin-role").click(function() {
        var username = $(this).parent().parent().children().eq(1).text();
        setMemberRole(username, "member");
    });



}
function updateProductBtn(nameNew, priceNew, categoryNew, imageSrc){
    $(".edit").click(function(){
        addProductOrEdit = false;
        show();
        productName = $(this).parent().parent().parent().children().eq(2).text();
    });
    $(".delete").click(function(){
        $(this).parent().parent().parent().hide();

        var thisBtn = this;
        allProduct.forEach(function(product) {
            if (product.name == $(thisBtn).parent().parent().parent().children().eq(2).text() ){
                $.ajax({
                    url: 'https://thawing-forest-86527.herokuapp.com/api/remove_a_product/'+product._id+token,
                    type: 'DELETE',
                    success: function(result) {
                        alert('This product has been deleted!!!');
                        updateProductList();
                        return false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return false;
                    }
                });
            }
        });
    })
}
function finCategoryByName(name){
    var ressult;
    allCategory.forEach(function(category){
        if (category.name == name) {
            ressult = category._id;
            return;
        }
    })
    return ressult;
}
function findCategoryById(id){
    var ressult;
    allCategory.forEach(function(category){
        if (category._id == id) {
            ressult = category.name;
            return;
        }
    })
    return ressult;
}
function findUserById(id){
    var ressult;
    allUser.forEach(function(user){
        if (user._id == id) {
            ressult = user.name;
            return;
        }
    })
    return ressult;
}
function findProductById(id){
    var ressult;
    allProduct.forEach(function(product){
        if (product._id == id) {
            ressult = product.name;
            return;
        }
    })
    return ressult;
}
function updateCategoryBtn(){
    $(".delete-category").click(function(){
        var id = finCategoryByName($(this).parent().parent().children().eq(1).text());
        $.ajax({
            url: 'https://thawing-forest-86527.herokuapp.com/api/category/'+id+token,
            type: 'DELETE',
            success: function(result) {
                alert('This category has been deleted!!!');
                updateCategoryList();
                return false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return false;
            }
        });
    })
}
function updateCategoryList(){
    $.get("https://thawing-forest-86527.herokuapp.com/api/all_categories"+token,
        function(data, status) {
            console.log("Update category list " + status);
            $("#product-category").html("");
            $("#category-list").html("");
            allCategory = data;
            categoryCount = 0;
            data.forEach(function(category){
                    $("#product-category").append(
                        '<option value="'+ category.name+'">'+category.name +'</option>'
                    );
                    $("#category-list").append(
                        '<tr>'+
                        '<td>'+categoryCount+'</td>'+
                        '<td>'+category.name+'</td>'+
                        '<td>'+category.slug+'</td>'+
                        '<td>'+category.description+'</td>'+
                        '<td>'+category.count + '</td>'+
                        '<td>'+
                        '<button  class="delete-category edit-button btn btn-danger">Delete</button>'+
                        '</td>'+
                        '</tr>'
                    );
                    categoryCount++;
            });
            updateCategoryBtn();
        }
    );
}
function updateProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew){

    allProduct.forEach(function(product){
        if (product.name == productName)
        {
            $.ajax({
                url: 'https://thawing-forest-86527.herokuapp.com/api/update_a_product/'+product._id+token,
                type: 'PUT',
                data: JSON.stringify({
                    name: nameNew,
                    description: desNew,
                    _category: finCategoryByName(categoryNew),
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
                    alert('This product has been updated!!!');
                    updateProductList();
                    return;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                    return;
                }
            });
        }
    })
}
function setMemberRole(username, role){
	var check =false;
    allUser.forEach(function(user){
		if (user.username == username)
		{
		    check = true;
            $.ajax({
                url: 'https://thawing-forest-86527.herokuapp.com/api/users/'+user._id+token,
                type: 'PUT',
                data: JSON.stringify({role: role}),
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                success: function(result) {
                    alert('Đã cập nhật người dùng thành ' +role);
                    updateAdminList();
                    return;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                    return;
                }
            });
		}
	})
	if (!check)
	    alert("Username không tồn tại");
}
function updateProductList() {
    $.get("https://thawing-forest-86527.herokuapp.com/api/get_all_products"+token,
        function(data, status) {
            console.log("Update product list " + status);
            $("#product-list").html("");
            var productCount=1;
            allProduct = data;
            var imageSrc = null;
            allProduct.forEach(function(product){
                if (product.image_link[0]=='i')
                    imageSrc = '../'+product.image_link;
                else imageSrc = product.image_link;
                $("#product-list").append(
                    '<tr>'+
                    '<td>'+productCount+'</td>' +
                    '<td><img class="icon-row" src="'+imageSrc+'"></td>'+
                    '<td>'+product.name+'</td>'+
                    '<td>'+product.price+' VND </td>'+
                    '<td>'+findCategoryById(product._category)+'</td>' +
                    '<td>' +
                    '<div>' +
                    '<button  class="delete edit-button btn btn-danger">Delete</button>' +
                    '</div>' +
                    '<div>'+
                    '<button  class="edit edit-button btn btn-success">Edit</button>'+
                    '</div>'+

                    '</td>'+
                    '</tr>');
                productCount++;
            });
            updateProductBtn();
            updateOrderLists();
        });
}
function addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew){
    $.ajax({
        url: 'https://thawing-forest-86527.herokuapp.com/api/add_new_product/'+token,
        type: 'PUT',
        data: JSON.stringify({
            name: nameNew,
            description: desNew,
            _category: finCategoryByName(categoryNew),
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
function addCategory(name, slug, des){
    $.ajax({
        url: 'https://thawing-forest-86527.herokuapp.com/api/category/'+token,
        type: 'POST',
        data: JSON.stringify({
            name: name,
            description: des,
            slug: slug,
            count: 0
        }),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            alert('Added category!!!');
            updateCategoryList();
            return;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            return;
        }
    });
}
function updateOrderLists(){
    $.get("https://thawing-forest-86527.herokuapp.com/api/all_orders"+token,
        function(data, status) {
            console.log("Update orders list " + status);
            $("#order-list").html("");
            var Count=1;
            allOrder = data;
            allOrder.forEach(function(order){
                var date = new Date(order.date);
                $("#order-list").append(
                '<li class="list-group-item">'+

                    '<p class="col-lg-1">'+Count+'</p>'+
                    '<p class="col-lg-3">'+findProductById(order._product)+'</p>'+
                    '<p class="col-lg-2">'+findUserById(order._user)+'</p>'+
                    '<p class="col-lg-2">'+date.getDate()+'/'+date.getMonth()+'/'+date.getYear()+'</p>'+
                    '<p style="display: inline">'+order.status+'</p>'+
                    '<button class="btn btn-success edit-order" style="float: right; margin-left: 5em">Edit</button>'+
                    '<span class="badge">'+order.amount+'</span>'+
                    '</li>'
                );
                Count++;
            });
            //updateProductBtn();
        }
    );
}
$(document).ready(function(){
	updateAdminList();
    updateCategoryList();
	updateProductList();

	$("#add-role-button").click(function(){
		$("#add-role-form").removeClass("hidden");
	})
	$("#add-role-cancel-button").click(function(){
		$("#add-role-form").addClass("hidden");
	})
	$("#add-role-form").submit(function(event){
		event.preventDefault();
		var userName=null;
		if ($("#username").val()!="")
			userName = $("#username").val();
	    if (!userName) {
			alert("Vui lòng điền username");
			return;
		}
		setMemberRole(userName,"admin");

	});
	$("#form-submit-add-category").submit(function(event){
		event.preventDefault();
		var name=null, slug=null, des=null;
		if ($('#name-category').val()!="")
						name = $('#name-category').val();
		if ($('#slug-category').val()!="")
						slug = $('#slug-category').val();
		if ($('#des-category').val()!="")
						des = $('#des-category').val();
		if (!(name&&slug&&des)) {
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}
        addCategory(name, slug, des);
	});
	$("#product-form").submit(function(event){
				event.preventDefault();
				var nameNew, priceNew, categoryNew, colorNew, sizeNew, brandNew, saleNew, desNew;
				if ($('#product-name').val()!="")
						nameNew = $('#product-name').val();
				if ($('#product-price').val()!="")
                        priceNew = $('#product-price').val();
                 if ($('#product-category').val()!="")
                        categoryNew = $('#product-category').val();
                if ($('#product-color').val()!="")
                        colorNew = $('#product-color').val();
                if ($('#product-size').val()!="")
                        sizeNew = $('#product-size').val();
                if ($('#product-brand').val()!="")
                        brandNew = $('#product-brand').val();
                if ($('#product-des').val()!="")
                        desNew = $('#product-des').val();
                if ($('#product-sale').val()!="")
                        saleNew = $('#product-sale').val();
        if (!(nameNew&&priceNew&&categoryNew&&colorNew&&sizeNew&&brandNew&&saleNew&&desNew&&imageSrc)) {
					alert("Vui lòng điền đầy đủ thông tin vào form");
					return;
				}
				if (addProductOrEdit==false) {
				    updateProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew);
				} else if (addProductOrEdit==true)
				{
                    addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew);
                }
				hide();				
    });
	$("#cancel").click(hide);
	$("#upload-image").change(function(){
		  	var url = $(this).val();
		    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
		    if (this.files && this.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) 
		     {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	imageSrc=e.target.result;
		           $('#loaded-image').attr('src', e.target.result);
		        }
		       reader.readAsDataURL(this.files[0]);
		    }
		    else
		    {
                imageSrc=null;
		      $('#loaded-image').attr('src', 'images/noimagefound.jpg');
		    }
	})
	$("#add-product").click(function(){
		addProductOrEdit = true;
		show();
	})
});

