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
	    	num = $('<p>').text(contacts[i].numbers.type + ":  " + contacts[i].numbers.number + '\n');
	    	full_contact.append(num);
	    }
	    del = $('<button>').attr('id', 'delete-' + contacts[i].id).text("delete");    
	    edit = $('<button>').attr('id', 'edit-' + contacts[i].id).text("edit");
	    add_num = $('<button>').attr('id', 'add-' + contacts[i].id).text("add number");
	    full_contact.append(del);
	    full_contact.append(edit);
	    full_contact.append(add_num);
	    div.append(full_contact);
	  }
	  $(div).appendTo("#container");

	  $()
	}

	// display_contacts();

	$('#search').submit(function(event) {
		console.log("searching");
    event.preventDefault();
    var values = {};
    $.each($('#search').serializeArray(), function(i, field) {
    	values[field.name] = field.value;
    });
    var result;
    console.log(values);
    load_contacts(values['search']);
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
    	data: values,
    	sucess: function() {
    		display_contacts(load_contacts());
    	}
    	});
	});

	var load_contacts = function(query) {
		  $.getJSON('/contacts', query, function(data) {
    	console.log("success");
    	console.log(data);
    	display_contacts(data);
    });
	}


  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
