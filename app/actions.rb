# Homepage (Root path)
get '/' do
  erb :index
  #return all contacts and numbers
  #search??
end

get '/contacts' do
	content_type :json
  Contact.all.to_json(:include => :numbers)
end

post '/contacts/new' do
	#create new contact, add to list
	contact = Contact.new(params)
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






