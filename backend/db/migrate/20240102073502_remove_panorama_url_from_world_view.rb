class RemovePanoramaUrlFromWorldView < ActiveRecord::Migration[7.0]
  def up
    remove_index :world_views, name: "index_world_views_on_name_and_panorama_url"
    remove_column :world_views, :panorama_url, :string
  end

  def down
    add_index :world_views, name: "index_world_views_on_name_and_panorama_url"
    add_column :world_views, :panorama_url, :string
  end
end
