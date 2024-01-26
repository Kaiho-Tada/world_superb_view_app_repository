class AddUniqueIndexToWorldViewCountries < ActiveRecord::Migration[7.0]
  def change
    add_index :world_view_countries, [:world_view_id, :country_id], unique: true
  end
end
