class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def up
    add_column :users, :role, :string, default: 'user'
  end

  def down
    remove_column :users, :role, :string
  end
end
