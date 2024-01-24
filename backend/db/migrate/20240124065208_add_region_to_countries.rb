class AddRegionToCountries < ActiveRecord::Migration[7.0]
  def change
    add_column :countries, :region, :string,  null: false
  end
end
