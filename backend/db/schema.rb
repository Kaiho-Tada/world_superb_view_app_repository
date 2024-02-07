# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_02_07_034837) do
  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "classification", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "characteristics", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_characteristics_on_name", unique: true
  end

  create_table "countries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "code", null: false
    t.integer "risk_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "bmi", precision: 5, scale: 2, default: "0.0", null: false
    t.string "region", null: false
    t.index ["name", "code"], name: "index_countries_on_name_and_code", unique: true
  end

  create_table "genres", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_genres_on_name", unique: true
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.boolean "is_admin", default: false
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "user"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "video_genres", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "genre_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_video_genres_on_genre_id"
    t.index ["video_id", "genre_id"], name: "index_video_genres_on_video_id_and_genre_id", unique: true
    t.index ["video_id"], name: "index_video_genres_on_video_id"
  end

  create_table "videos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title", null: false
    t.string "poster_path", null: false
    t.float "popularity", null: false
    t.float "vote_average", null: false
    t.string "release_date", null: false
    t.boolean "is_movie", null: false
    t.text "overview"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_videos_on_title", unique: true
  end

  create_table "world_view_categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "world_view_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_world_view_categories_on_category_id"
    t.index ["world_view_id", "category_id"], name: "index_world_view_categories_on_world_view_id_and_category_id", unique: true
    t.index ["world_view_id"], name: "index_world_view_categories_on_world_view_id"
  end

  create_table "world_view_characteristics", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "world_view_id", null: false
    t.bigint "characteristic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["characteristic_id"], name: "index_world_view_characteristics_on_characteristic_id"
    t.index ["world_view_id", "characteristic_id"], name: "index_unique_on_world_view_id_and_characteristic_id", unique: true
    t.index ["world_view_id"], name: "index_world_view_characteristics_on_world_view_id"
  end

  create_table "world_view_countries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "world_view_id", null: false
    t.bigint "country_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_world_view_countries_on_country_id"
    t.index ["world_view_id", "country_id"], name: "index_world_view_countries_on_world_view_id_and_country_id", unique: true
    t.index ["world_view_id"], name: "index_world_view_countries_on_world_view_id"
  end

  create_table "world_view_favorites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "world_view_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_world_view_favorites_on_user_id"
    t.index ["world_view_id", "user_id"], name: "index_world_view_favorites_on_world_view_id_and_user_id", unique: true
    t.index ["world_view_id"], name: "index_world_view_favorites_on_world_view_id"
  end

  create_table "world_view_videos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "world_view_id", null: false
    t.bigint "video_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["video_id"], name: "index_world_view_videos_on_video_id"
    t.index ["world_view_id", "video_id"], name: "index_world_view_videos_on_world_view_id_and_video_id", unique: true
    t.index ["world_view_id"], name: "index_world_view_videos_on_world_view_id"
  end

  create_table "world_views", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "best_season", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "img_url"
    t.string "gif_url"
    t.string "gif_site"
    t.index ["name"], name: "index_world_views_on_name", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "video_genres", "genres"
  add_foreign_key "video_genres", "videos"
  add_foreign_key "world_view_categories", "categories"
  add_foreign_key "world_view_categories", "world_views"
  add_foreign_key "world_view_characteristics", "characteristics"
  add_foreign_key "world_view_characteristics", "world_views"
  add_foreign_key "world_view_countries", "countries"
  add_foreign_key "world_view_countries", "world_views"
  add_foreign_key "world_view_favorites", "users"
  add_foreign_key "world_view_favorites", "world_views"
  add_foreign_key "world_view_videos", "videos"
  add_foreign_key "world_view_videos", "world_views"
end
