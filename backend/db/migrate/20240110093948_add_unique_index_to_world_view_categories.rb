class AddUniqueIndexToWorldViewCategories < ActiveRecord::Migration[7.0]
  def change
    add_index :world_view_categories, [:world_view_id, :category_id], unique: true
  end
end
