class CreateCharacteristics < ActiveRecord::Migration[7.0]
  def change
    create_table :characteristics do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :characteristics, [:name], unique: true
  end
end
