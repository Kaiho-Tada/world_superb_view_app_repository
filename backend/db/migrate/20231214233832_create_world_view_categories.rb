class CreateWorldViewCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :world_view_categories do |t|
      t.references :world_view, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
