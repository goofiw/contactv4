class Contact < ActiveRecord::Base
  has_many :numbers

  def create(params) 
  	first_name: params[:first_name],
  	last_name: params[:last_name],
  	email: params[:email]
	end
end