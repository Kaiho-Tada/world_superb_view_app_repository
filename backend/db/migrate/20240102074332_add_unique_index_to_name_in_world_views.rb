class AddUniqueIndexToNameInWorldViews < ActiveRecord::Migration[7.0]
  def up
    add_index :world_views, :name, unique: true
  end

  def down
    remove_index :world_views, :name
  end
end
