class DropTableMovies < ActiveRecord::Migration[7.0]
  def change
    drop_table :movies
  end

  def down
    create_table :movies do |t|
      t.string :title, null: false
      t.string :poster_path, null: false
      t.integer :budget, null: false
      t.bigint :revenue, null: false
      t.float :popularity, null: false
      t.float :vote_average, null: false
      t.string :release_date, null: false
      t.boolean :status, null: false
      t.text :overview

      t.timestamps
    end
    add_index :movies, :title, unique: true
  end
end
