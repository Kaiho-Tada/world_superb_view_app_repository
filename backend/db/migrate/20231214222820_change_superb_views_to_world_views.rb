class ChangeSuperbViewsToWorldViews < ActiveRecord::Migration[7.0]
  def change
    rename_table :superb_views, :world_views
  end
end
