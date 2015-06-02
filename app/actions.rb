# Homepage (Root path)
get '/' do
  erb :index
  #return all contacts and numbers
  #search??
end

post '/contacts/new' do
	#create new contact, add to list
	#respond with list
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






