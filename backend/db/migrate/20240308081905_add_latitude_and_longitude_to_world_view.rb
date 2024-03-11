class AddLatitudeAndLongitudeToWorldView < ActiveRecord::Migration[7.0]
  def change
    add_column :world_views, :latitude, :float, null: false
    add_column :world_views, :longitude, :float, null: false
  end
end
