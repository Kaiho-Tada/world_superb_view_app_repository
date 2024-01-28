class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :poster_path, null: false
      t.string :homepage, null: false
      t.integer :budget, null: false
      t.integer :revenue, null: false
      t.integer :popularity, null: false
      t.integer :vote_average, null: false
      t.string :release_date, null: false
      t.string :status, null: false
      t.text :overview

      t.timestamps
    end
    add_index :movies, :title, unique: true
  end
end
