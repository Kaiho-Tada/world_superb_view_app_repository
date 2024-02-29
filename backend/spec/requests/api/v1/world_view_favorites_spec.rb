require "rails_helper"

RSpec.describe "Api::V1::WorldViewFavorites", type: :request do
  describe "POST /api/v1/world_view_favorites" do
    let!(:user) { create(:user, confirmed_at: Time.zone.today) }
    let!(:world_view) { create(:world_view) }
    describe "お気に入り登録のテスト" do
      it "お気に入り登録できること" do
        auth_tokens = sign_in(user)
        post api_v1_world_view_favorites_path, params: {
          world_view_favorites: {
            world_view_id: world_view.id
          }
        }, headers: auth_tokens
        expect(response).to have_http_status(200)
        json = JSON.parse(response.body)
        expect(json["user_id"]).to eq user.id
      end

      it "world_view_idと同じidを持つWorldViewモデルが見つからない場合、お気に入り登録に失敗すること" do
        auth_tokens = sign_in(user)
        expect do
          post api_v1_world_view_favorites_path, params: {
            world_view_favorites: {
              world_view_id: 9999
            }
          }, headers: auth_tokens
        end.to raise_error ActiveRecord::RecordInvalid
      end

      it "ユーザーが認証されていない場合、お気に入り登録に失敗すること" do
        post api_v1_world_view_favorites_path, params: {
          world_view_favorites: {
            world_view_id: world_view.id
          }
        }
        expect(response).to have_http_status(401)
      end
    end
  end

  describe " DELETE /api/v1/world_view_favorites/:id" do
    let!(:world_view_favorite) { create(:world_view_favorite) }

    it "お気に入り解除できること" do
      delete api_v1_world_view_favorite_path(world_view_favorite)
      expect(response).to have_http_status(204)
      expect(WorldViewFavorite.exists?(world_view_favorite.id)).to be false
    end

    it "存在しないidのparamsを指定してお気に入りが見つからない場合、削除に失敗すること" do
      expect do
        delete api_v1_world_view_favorite_path(id: 9999)
      end.to raise_error ActiveRecord::RecordNotFound
    end
  end
end
