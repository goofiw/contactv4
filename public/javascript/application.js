$(document).ready(function() {
  //add a div for each contact with delete, edit, and add num buttons

  var info, num, functions;
  nums = $('<div>').addClass("numbers")

  for(var i = 0; i < contacts.length; i++) {
    info = $('<div>').addClass("contact").text("Name:  " + contacts[i].first_name + " " + contacts[i].last_name + "\nEmail:  " + contacts[i].email);
    for(var n = 0; n < contacts[i].numbers.length; n++){
    	num = $('<div>').text(contacts[i].numbers.type + ":  " + contacts[i].numbers.number + '\n');
    	nums.append(num)
    }    
  }  
  $(info).apendto("#container");
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
