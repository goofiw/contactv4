class AddContact < ActiveRecord::Migration
  def change

  	create_table :contacts do |t|
	  	t.string :first_name
	  	t.string :last_name
	  	t.string :email
    end

    create_table :numbers do |t|
    	t.string :number
    	t.string :type
    	t.belongs_to :contact, index: true
    end
  end
end
