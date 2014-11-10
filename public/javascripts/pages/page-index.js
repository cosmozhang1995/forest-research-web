$(document).ready(function() {
	$('#file').change(function(event) {
		// $('#form').submit();
		var filename = this.value.split(/[\/\\]/);
		filename = filename[filename.length - 1];
		$('.btn-file-choose').text(filename);
	});

	var dropbox = document.getElementById('file-dropbox');

	// dropbox.addEventListener("dragenter", function(e){  
	// 	dropbox.style.borderColor = '#666';
	// }, false);
	// dropbox.addEventListener("dragleave", function(e){  
	// 	dropbox.style.borderColor = '#ccc';
	// }, false);
	// dropbox.addEventListener("dragenter", function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// }, false);
	// dropbox.addEventListener("dragover", function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// }, false);
	// dropbox.addEventListener("drop", function(e){
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// 	dropbox.style.borderColor = '#ccc';
	// 	handleFiles(e.dataTransfer.files);  
	// }, false);
	
	$('.btn-file-choose').on('click', function(event) {
		event.preventDefault();
		$('#file').click();
	});

	$('.btn-category-select').on('click', function(event) {
		event.preventDefault();
		$('#category').val($(this).data('value'));
		$('#category').attr('value', $(this).data('value'));
		$('.btn-category-select').removeClass('btn-warning');
		$(this).addClass('btn-warning');
	});

	$($('.btn-category-select').get(0)).click();
});

function handleFiles(files) {
	console.log(files);
	myf = files;
}