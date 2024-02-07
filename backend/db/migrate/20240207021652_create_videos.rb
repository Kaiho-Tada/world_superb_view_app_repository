class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.string :poster_path, null: false
      t.float :popularity, null: false
      t.float :vote_average, null: false
      t.string :release_date, null: false
      t.boolean :is_movie, null:false
      t.text :overview

      t.timestamps
    end
    add_index :videos, :title, unique: true
  end
end
