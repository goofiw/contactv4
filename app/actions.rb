# Homepage (Root path)
get '/' do
  erb :index
  #return all contacts and numbers
  #search??
end

get '/contacts' do
	query = params[:search]
	content_type :json
	if(params[:search].blank?)
	  contacts = Contact.all
	else
   contacts = Contact.where("first_name LIKE ?
    								OR last_name LIKE ?
    								OR email LIKE ?
    								OR id LIKE ?", 
    								"%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
	end
	contacts.to_json(:include => :numbers)
end

post '/contacts/new' do
	# data = JSON.parse(request.body.read)
	puts data
	contact = Contact.new(data)
	contact.save
end

put '/contacts/:id' do
	#update a contact with provided json data
end

delete '/photos/:id' do
#duh
end

post 'contacts/:id/numbers/new' do
#add new number to contact
end

put 'contacts/:id/numbers/:number_id' do
#not sure this works.
end






