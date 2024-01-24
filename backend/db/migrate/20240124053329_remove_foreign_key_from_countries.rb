class RemoveForeignKeyFromCountries < ActiveRecord::Migration[7.0]
  def up
    remove_column :countries, :state_id
  end

  def down
    add_reference :countries, :state, null: false, foreign_key: true
  end
end
