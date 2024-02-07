class CreateVideoGenres < ActiveRecord::Migration[7.0]
  def change
    create_table :video_genres do |t|
      t.references :video, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
    add_index :video_genres, [:video_id, :genre_id], unique: true
  end
end
