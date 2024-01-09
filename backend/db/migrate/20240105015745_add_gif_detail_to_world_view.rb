class AddGifDetailToWorldView < ActiveRecord::Migration[7.0]
  def change
    add_column :world_views, :gif_url, :string
    add_column :world_views, :gif_site, :string
  end
end
