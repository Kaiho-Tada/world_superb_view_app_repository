class CreateWorldViewVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :world_view_videos do |t|
      t.references :world_view, null: false, foreign_key: true
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
    add_index :world_view_videos, [:world_view_id, :video_id], unique: true
  end
end
