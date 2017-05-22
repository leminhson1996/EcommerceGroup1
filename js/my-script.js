$(document).ready(function() {
    $('.category-menu').on('click', 'a.category-name', function (e) {
        e.preventDefault();

        $('li a.category-name').removeClass('active');
        $(this).addClass('active');

        var container = $('.pink');
        container.find('.products').addClass('hidden');

        var filterValue = $(this).attr('data-filter');
        container.find(filterValue).removeClass('hidden');
    });
});


$(document).ready(function() {
    // Get categories menu
    $.ajax({
        url 		: 		"https://thawing-forest-86527.herokuapp.com/api/all_categories",
        type 		: 		'GET',
        dataType 	: 		'json',

        success 	: 		function(data) {

            var categoriesLength = data.length;

            for (var i = 0; i < categoriesLength; i++) {
         		// Ngân thêm vô đây
         		var categoryTemplate = $('.category-template').clone();
         		categoryTemplate.removeClass('hidden');
         		categoryTemplate.find('.category-name').html(data[i].name);
         		(categoryTemplate.find('.category-name')).attr('data-filter', '.'+ data[i].slug);
         		// console.log(dataFilter);
         		$('.category-menu').append(categoryTemplate.html());
            }
        }
    });
});