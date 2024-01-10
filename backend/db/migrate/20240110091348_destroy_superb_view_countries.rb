class DestroySuperbViewCountries < ActiveRecord::Migration[7.0]
  def change
    drop_table :superb_view_countries
  end
end
