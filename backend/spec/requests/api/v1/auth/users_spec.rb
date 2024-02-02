require "rails_helper"

RSpec.describe "Api::V1::Auth::Users", type: :request do
  describe "GET /api/v1/auth/users" do
    it "roleがadminとguest以外のUserモデルのレコードが全件取得できること" do
      create(:user, role: "admin")
      create(:user, role: "guest")
      users = create_list(:user, 2)

      get api_v1_auth_users_path
      expect(response).to have_http_status(200)
      json_response = JSON.parse(response.body)
      expected_json = users.as_json(only: %i[id email name nickname])
      expect(json_response).to eq expected_json
      expect(json_response.length).to eq 2
    end

    it "indexアクション内で発生したエラーが適切に処理されること" do
      allow(User).to receive(:where).and_raise(StandardError, "error message")
      expect(Rails.logger).to receive(:error).with(StandardError)
      expect(Rails.logger).to receive(:error).with("error message")
      expect(Rails.logger).to receive(:error).with(instance_of(String))
      get api_v1_auth_users_path
      json_response = JSON.parse(response.body)
      expect(response).to have_http_status(500)
      expect(json_response["error"]).to eq("Userモデルの取得に失敗しました。")
    end
  end

  describe " DELETE /api/v1/users/:id" do
    it "ユーザーを削除できること" do
      user = create(:user, email: "test@example.com")
      delete api_v1_auth_user_path(user)
      json_response = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json_response["message"]).to eq("'test@example.com'のアカウントは削除されました。")
      expect(User.exists?(user.id)).to be_falsey
    end
  end
end
