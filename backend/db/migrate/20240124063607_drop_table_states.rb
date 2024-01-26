class DropTableStates < ActiveRecord::Migration[7.0]
  def up
    drop_table :states
  end

  def down
    create_table :states do |t|
      t.string :name, null: false
      t.string :code, null: false

      t.timestamps
    end
    add_index :states, [:name, :code], unique: true
  end
end
