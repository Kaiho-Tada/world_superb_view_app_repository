class CreateWorldViewFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :world_view_favorites do |t|
      t.references :world_view, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :world_view_favorites, [:world_view_id, :user_id], unique: true
  end
end
