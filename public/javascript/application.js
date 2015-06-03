$(document).ready(function() {
  //add a div for each contact with delete, edit, and add num buttons
  var display_contacts = function(contacts){
  	console.log(contacts);
	  var info, num, del, edit, add_num, full_contact, create;
	  var full_contact = $('<div>').addClass("full-contact");
	  var div = $('<div>')

	  for(var i = 0; i < contacts.length; i++) {
	    full_contact.append($('<p>').addClass("contact").text("Name:  " + contacts[i].first_name + " " + contacts[i].last_name + "\nEmail:  " + contacts[i].email));
	    for(var n = 0; n < contacts[i].numbers.length; n++){
	    	num = $('<p>').text(contacts[i].numbers.type + ":  " + contacts[i].numbers[n] + '\n');
	    	full_contact.append(num);
	    }
	    del = $('<button>').addClass("delete").attr('data-id', contacts[i].id).text("delete");    
	    edit = $('<button>').addClass("edit").attr('data-id', contacts[i].id).text("edit");
	    add_num = $('<button>').addClass("add-num").attr('data-id', contacts[i].id).text("add number");
	    full_contact.append(del);
	    full_contact.append(edit);
	    full_contact.append(add_num);
	    div.append(full_contact);
	  }
	  $("#container").empty();
	  $(div).appendTo("#container");
	}


  $('#container').on('click', '.delete', function(){
  	console.log("WTF");
    console.log($(this).data('id'));

    //add ajax to delete a contact
  });
	// display_contacts();

	$('#search').submit(function(event) {
		console.log("searching");
    event.preventDefault();

    var value = {};
    $.each($('#search').serializeArray(), function(i, field) {
    	value[field.name] = field.value;
    });

    console.log(value);
    load_contacts(value);
	});

	$('#create').submit(function(event) {
		event.preventDefault();
		var values = {};
		$.each($('#create').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});
		console.log("sending ajax request");
    $.ajax({
    	type: "POST",
    	url: 'contacts/new',
    	dataType: 'json',
    	data: JSON.stringify(values),
    	complete: function(q) {  //Should be success, returning 200 but still not hitting
    		console.log(q)
    		console.log("YAY");
    		load_contacts();
    		$('#create')[0].reset();
    	}
    	});
	});

	var load_contacts = function(query) {
		  $.getJSON('/contacts', query, function(data) {
	  	console.log("loading")
    	console.log("getting json for load contacts");
    	console.log(data);
    	display_contacts(data);
    });
	}
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
