class CreateSuperbViews < ActiveRecord::Migration[7.0]
  def change
    create_table :superb_views do |t|
      t.string :name,          null: false
      t.string :panorama_url,  null: false
      t.string :best_season,   null: false

      t.timestamps
    end
    add_index :superb_views, [:name, :panorama_url], unique: true
  end
end
