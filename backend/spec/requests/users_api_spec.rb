require "rails_helper"

RSpec.describe "Users Api", type: :request do
  describe "Post /api/v1/auth" do
    it "email,passwordが正しいフォーマットである場合、ユーザー登録できること" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        password: "password",
        confirm_success_url: "http://localhost:4000/login"
      }
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "success"
      expect(@json["data"]["email"]).to eq "test@example.com"
    end

    it "emailが存在しなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        password: "password",
        confirm_success_url: "http://localhost:4000/login"
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["Eメールを入力してください"]
    end

    it "passwordが存在しなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        confirm_success_url: "http://localhost:4000/login"
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["パスワードを入力してください"]
    end

    it "メールアドレスが重複した場合、登録できないこと" do
      create(:user, email: "test@example.com")
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        password: "password",
        confirm_success_url: "http://localhost:4000/login"
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["Eメールはすでに存在します"]
    end

    it "パスワードは6文字以上でなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        password: "passw",
        confirm_success_url: "http://localhost:4000/login"
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["パスワードは6文字以上で入力してください"]
    end
  end

  describe "Post /api/v1/auth/sign_in" do
    let!(:confirmed_user) { create(:user, email: "test@example.com", password: "password", confirmed_at: Time.zone.today) }

    context "認証済みの場合" do
      it "正しいemailとパスワードでログインできること" do
        post api_v1_user_session_path, params: {
          email: confirmed_user.email,
          password: confirmed_user.password
        }
        @json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(@json["data"]["email"]).to eq confirmed_user.email
      end

      it "emailが間違っている場合、ログインできないこと" do
        post api_v1_user_session_path, params: {
          email: "tast@example.com",
          password: confirmed_user.password
        }
        expect(response).to have_http_status(401)
        @json = JSON.parse(response.body)
        expect(@json["success"]).to eq false
        expect(@json["errors"]).to eq ["ログイン用の認証情報が正しくありません。再度お試しください。"]
      end

      it "passwordが間違っている場合、ログインできないこと" do
        post api_v1_user_session_path, params: {
          email: confirmed_user.email,
          password: "passward"
        }
        expect(response).to have_http_status(401)
        @json = JSON.parse(response.body)
        expect(@json["success"]).to eq false
        expect(@json["errors"]).to eq ["ログイン用の認証情報が正しくありません。再度お試しください。"]
      end
    end

    context "未認証の場合" do
      let(:no_confirmed_user) { create(:user, confirmed_at: "") }
      it "email,passwordが正しくても、ログインに失敗すること" do
        post api_v1_user_session_path, params: {
          email: no_confirmed_user.email,
          password: no_confirmed_user.password
        }
        @json = JSON.parse(response.body)
        expect(response).to have_http_status(401)
        expect(@json["success"]).to eq false
        expect(@json["errors"]).to include("'#{no_confirmed_user.email}' に確認用のメールを送信しました。メール内の説明を読み、アカウントの有効化をしてください。")
      end
    end
  end

  describe "Get /api/v1/auth/sesstions" do
    let!(:user) { create(:user, confirmed_at: Time.zone.today) }
    it "認証が成功した場合、200番ステータスとcurrent_userが返されること" do
      auth_tokens = sign_in(user)
      get api_v1_auth_sessions_path, headers: auth_tokens
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq 200
      expect(@json["current_user"]["email"]).to eq user.email
    end

    it "認証に失敗した場合、500番ステータスが返されること" do
      get api_v1_auth_sessions_path, headers: {}
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq 500
    end
  end

  describe "Put /api/v1/auth" do
    let!(:user) { create(:user, confirmed_at: Time.zone.today) }
    it "プロフィールを更新できること" do
      auth_tokens = sign_in(user)
      put api_v1_user_registration_path, params: {
        name: "new_name",
        nickname: "new_nickname",
        email: "new_test@example.com"
      }, headers: auth_tokens
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "success"
      expect(@json["data"]["name"]).to eq "new_name"
      expect(@json["data"]["nickname"]).to eq "new_nickname"
      expect(@json["data"]["email"]).to eq "new_test@example.com"
    end

    it "リクエストのemailが空文字列の場合はプロフィールの更新に失敗すること" do
      auth_tokens = sign_in(user)
      put api_v1_user_registration_path, params: {
        name: "new_name",
        nickname: "new_nickname",
        email: ""
      }, headers: auth_tokens
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["Eメールを入力してください"]
    end

    it "リクエストのemailのフォーマットが正しくない場合はプロフィールの更新に失敗すること" do
      auth_tokens = sign_in(user)
      put api_v1_user_registration_path, params: {
        name: "name",
        nickname: "nickname",
        email: "test.example.com"
      }, headers: auth_tokens
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["Eメールは有効ではありません"]
    end

    it "リクエストにヘッダー認証情報が含まれていない場合はプロフィールの更新に失敗すること" do
      put api_v1_user_registration_path, params: {
        name: "name",
        nickname: "nickname",
        email: "test.example.com"
      }, headers: {}
      expect(response).to have_http_status(404)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]).to eq ["ユーザーが見つかりません。"]
    end
  end

  describe "Put /api/v1/auth/password" do
    let!(:user) { create(:user, confirmed_at: Time.zone.today) }
    it "パスワードを更新できること" do
      auth_tokens = sign_in(user)
      put "/api/v1/auth/password", params: {
        password: "new_password",
        password_confirmation: "new_password"
      }, headers: auth_tokens
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["success"]).to eq true
      expect(@json["message"]).to eq "パスワードの更新に成功しました。"
    end

    it "パスワードが6文字以下の場合、パスワードの更新に失敗すること" do
      auth_tokens = sign_in(user)
      put "/api/v1/auth/password", params: {
        password: "pass",
        password_confirmation: "pass"
      }, headers: auth_tokens
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["success"]).to eq false
      expect(@json["errors"]["full_messages"]).to eq ["パスワードは6文字以上で入力してください"]
    end

    it "passwordとpassword_confirmationの値が異なる場合、パスワードの更新に失敗すること" do
      auth_tokens = sign_in(user)
      put "/api/v1/auth/password", params: {
        password: "new_password",
        password_confirmation: "new_passward"
      }, headers: auth_tokens
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["success"]).to eq false
      expect(@json["errors"]["full_messages"]).to eq ["パスワード（確認用）とパスワードの入力が一致しません"]
    end

    it "password_confirmationが送信されなかった場合、パスワードの更新に失敗すること" do
      auth_tokens = sign_in(user)
      put "/api/v1/auth/password", params: {
        password: "new_password"
      }, headers: auth_tokens
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["success"]).to eq false
      expect(@json["errors"]).to eq ["'Password', 'Password confirmation' パラメータが与えられていません。"]
    end

    it "リクエストにヘッダー認証情報が含まれていない場合はパスワードの更新に失敗すること" do
      put "/api/v1/auth/password", params: {
        password: "new_password",
        password_confirmation: "new_password"
      }, headers: {}
      expect(response).to have_http_status(401)
      @json = JSON.parse(response.body)
      expect(@json["success"]).to eq false
      expect(@json["errors"]).to eq ["Unauthorized"]
    end
  end

  describe "Delete /api/v1/auth" do
    let!(:user) { create(:user, confirmed_at: Time.zone.today) }
    it "アカウントを削除できること" do
      auth_tokens = sign_in(user)
      delete api_v1_user_registration_path, headers: auth_tokens
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "success"
      expect(@json["message"]).to eq "'#{user.email}' のアカウントは削除されました。"
    end

    it "リクエストにヘッダー認証情報が含まれていない場合は削除に失敗すること" do
      delete api_v1_user_registration_path, headers: {}
      expect(response).to have_http_status(404)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]).to eq ["削除するアカウントが見つかりません。"]
    end
  end
end
