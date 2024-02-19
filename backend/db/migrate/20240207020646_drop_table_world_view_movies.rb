class DropTableWorldViewMovies < ActiveRecord::Migration[7.0]
  def up
    drop_table :world_view_movies
  end

  def down
    create_table :world_view_movies do |t|
      t.references :world_view, null: false, foreign_key: true
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end

    add_index :world_view_movies, [:world_view_id, :movie_id], unique: true
  end
end
