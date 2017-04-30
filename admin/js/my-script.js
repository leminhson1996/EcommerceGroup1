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


$(document).ready(function(){
	var memberCount=4;
	$(".delete-role").click(function(){
		$(this).parent().parent().hide();
	})
	$("#add-role-button").click(function(){
		$("#add-role-form").removeClass("hidden");
	})
	$("#add-role-cancel-button").click(function(){
		$("#add-role-form").addClass("hidden");
	})
	$("#add-role-form").submit(function(event){
		event.preventDefault();
		var userName=null, name=null, email=null;
		if ($("#user-name").val()!="")
			userName = $("#user-name").val();
		if ($("#name").val()!="")
			name = $("#name").val();
		if ($("#email").val()!="")
			email = $("#email").val();
		if (!(userName&&name&&email)) {
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}

		if ($("#role-selector").val()=='admin')
			$("#member-list").append(
			 					 	'<tr>'+
	                                  '<td>'+memberCount+'</td>'+
	                                  '<td>'+userName+'</td>'+
	                                  '<td>'+name+'</td>'+                                 
	                                  '<td>'+email+'</td>'+            
	                                  '<td><span class="label label-primary">Admin</span></td>'+
	                                  '<td><button class="delete-role btn btn-danger btn-sm">Delete</button></td></tr>');
		if ($("#role-selector").val()=='editor')
			$("#member-list").append(
			 					 	'<tr>'+
	                                  '<td>'+memberCount+'</td>'+
	                                  '<td>'+userName+'</td>'+
	                                  '<td>'+name+'</td>'+                                 
	                                  '<td>'+email+'</td>'+            
	                                  '<td><span class="label label-warning">Editor</span></td>'+
	                                  '<td><button class="delete-role btn btn-danger btn-sm">Delete</button></td></tr>');
		

		memberCount++;
		alert("Added");
		$("#add-role-form").addClass("hidden");
		$(".delete-role").click(function(){
		$(this).parent().parent().hide();
	})

	})
	var categoryCount=3;
	$(".delete").click(function(){
		$(this).parent().parent().parent().hide();
	});
	$(".delete-category").click(function(){
		$(this).parent().parent().hide();
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
		$("#category-list").append(
			 						 '<tr>'+
		                                  '<td>'+categoryCount+'</td>'+
		                                  '<td>'+name+'</td>'+
		                                  '<td>'+slug+'</td>'+                                 
		                                  '<td>'+des+'</td>'+            
		                                  '<td> 0 </td>'+
		                                  '<td>'+		                           
	                                  		'<button  class="delete-category edit-button btn btn-danger">Delete</button>'+   
	                                  	  '</td>'+
		                              '</tr>'
			);
		categoryCount++;
		alert("Added!!!");
		$(".delete-category").click(function(){
		$(this).parent().parent().hide();
	});

	})

	var name, count, price, category, imageElement, imageSrc,add;
	add-false; 
	count = 4;
	imageSrc=null;
	$("#product-form").submit(function(event){
				event.preventDefault();
				var nameNew=null, priceNew=null, categoryNew=null;
				if ($('#name').val()!="")
						nameNew = $('#name').val();
				if ($('#price').val()!="")
					priceNew = $('#price').val();
				if ($("#car").is(":checked")) {
						categoryNew = $("#car").val();
					} else if ($("#clothes").is(":checked")) {
						categoryNew = $("#clothes").val();
					}
				if (!(categoryNew&&priceNew&&nameNew&&imageSrc)) {
					alert("Vui lòng điền đầy đủ thông tin vào form");
					return;
				}

				if (add==false) {
					
					$(name).html(nameNew);
					$(price).html(priceNew);
					$(category).html(categoryNew);
					$(imageElement).html('<img class="icon-row" src="'+imageSrc+'">');
					alert("Updated!!!");
				} else if (add==true)
				{
					$("tbody").append(
												'<tr>'+
				                                  '<td>'+count+'</td>' +
				                                  '<td><img class="icon-row" src="'+imageSrc+'"></td>'+
				                                  '<td>'+nameNew+'</td>'+                                 
				                                  '<td>'+priceNew+' VND </td>'+            
				                                  '<td>'+categoryNew+'</td>' +
				                                  '<td>' +
				                                  	'<div>' +
				                                  		'<button  class="delete edit-button btn btn-danger">Delete</button>' +
				                                  	'</div>' +
				                                  	'<div>'+
				                                  		'<button  class="edit edit-button btn btn-success">Edit</button>'+
				                                  	'</div>'+
				                                  	
				                                  '</td>'+
				                              '</tr>');
					$(".edit").click(function(){
						add = false;
						show();
						name = $(this).parent().parent().parent().children().eq(2);
						price = $(this).parent().parent().parent().children().eq(3);
						category = $(this).parent().parent().parent().children().eq(4);		
						imageElement = $(this).parent().parent().parent().children().eq(1);
					});	
					$(".delete").click(function(){
						$(this).parent().parent().parent().hide();
					})
					count++;
					alert("Added!!!");

				}
				hide();				
			});
	
	$(".edit").click(function(){
		add = false;
		show();
		name = $(this).parent().parent().parent().children().eq(2);
		price = $(this).parent().parent().parent().children().eq(3);
		category = $(this).parent().parent().parent().children().eq(4);		
		imageElement = $(this).parent().parent().parent().children().eq(1);
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
		add = true;
		show();
				
	})
});

