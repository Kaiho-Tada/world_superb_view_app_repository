class AddImgUrlToWorldView < ActiveRecord::Migration[7.0]
  def change
    add_column :world_views, :img_url, :string
  end
end
