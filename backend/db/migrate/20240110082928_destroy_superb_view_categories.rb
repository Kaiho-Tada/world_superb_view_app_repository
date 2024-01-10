class DestroySuperbViewCategories < ActiveRecord::Migration[7.0]
  def change
    drop_table :superb_view_categories
  end
end
