class DestroySuperbViewCharacteristics < ActiveRecord::Migration[7.0]
  def change
    drop_table :superb_view_characteristics
  end
end
