class AddUniqueIndexToWorldViewCharacteristics < ActiveRecord::Migration[7.0]
  def change
    add_index :world_view_characteristics, [:world_view_id, :characteristic_id], unique: true, name: "index_unique_on_world_view_id_and_characteristic_id"
  end
end
