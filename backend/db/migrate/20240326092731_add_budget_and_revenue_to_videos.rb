class AddBudgetAndRevenueToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :budget, :integer
    add_column :videos, :revenue, :bigint
  end
end
