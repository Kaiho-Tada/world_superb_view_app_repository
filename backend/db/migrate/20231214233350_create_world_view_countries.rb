class CreateWorldViewCountries < ActiveRecord::Migration[7.0]
  def change
    create_table :world_view_countries do |t|
      t.references :world_view, null: false, foreign_key: true
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end
  end
end
