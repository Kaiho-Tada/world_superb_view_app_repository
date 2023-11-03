class CreateCountries < ActiveRecord::Migration[7.0]
  def change
    create_table :countries do |t|
      t.string :name, null: false
      t.string :code, null: false
      t.integer :risk_level
      t.references :state, null: false, foreign_key: true

      t.timestamps
    end
    add_index :countries, [:name, :code], unique: true
  end
end
