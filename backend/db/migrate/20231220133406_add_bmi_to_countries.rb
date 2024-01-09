class AddBmiToCountries < ActiveRecord::Migration[7.0]
  def change
    add_column :countries, :bmi, :decimal, precision: 5, scale: 2, default: 0, null: false
  end
end
