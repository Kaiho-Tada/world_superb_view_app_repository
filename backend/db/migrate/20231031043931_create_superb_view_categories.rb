class CreateSuperbViewCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :superb_view_categories do |t|
      t.references :superb_view, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
