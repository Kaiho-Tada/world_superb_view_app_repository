require 'rails_helper'

RSpec.describe "Users Api", type: :request do
  describe "Post /api/v1/auth" do
    it "email,passwordが正しいフォーマットである場合、ユーザー登録できること" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        password: "password",
        confirm_success_url: "http://localhost:4000/login",
      }
      expect(response).to have_http_status(200)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "success"
      expect(@json["data"]["email"]).to eq "test@example.com"
    end

    it "emailが存在しなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        password: "password",
        confirm_success_url: "http://localhost:4000/login",
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["Eメールを入力してください"]
    end

    it "passwordが存在しなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        confirm_success_url: "http://localhost:4000/login",
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
        confirm_success_url: "http://localhost:4000/login",
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
        confirm_success_url: "http://localhost:4000/login",
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["パスワードは6文字以上で入力してください"]
    end

    it "passwordとpassword(確認)が一致しなければ登録できないこと" do
      post api_v1_user_registration_path, params: {
        email: "test@example.com",
        password: "password",
        password_confirmation: "passward",
        confirm_success_url: "http://localhost:4000/login",
      }
      expect(response).to have_http_status(422)
      @json = JSON.parse(response.body)
      expect(@json["status"]).to eq "error"
      expect(@json["errors"]["full_messages"]).to eq ["パスワード（確認用）とパスワードの入力が一致しません"]
    end
  end

  describe "Post /api/v1/auth/sign_in" do
    let!(:confirmed_user) { create(:user, email: "test@example.com", password: "password", confirmed_at: Date.today) }

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
          password: confirmed_user.password,
        }
        expect(response).to have_http_status(401)
        @json = JSON.parse(response.body)
        expect(@json["success"]).to eq false
        expect( @json["errors"]).to eq ["ログイン用の認証情報が正しくありません。再度お試しください。"]
      end

      it "passwordが間違っている場合、ログインできないこと" do
        post api_v1_user_session_path, params: {
          email: confirmed_user.email,
          password: "passward",
        }
        expect(response).to have_http_status(401)
        @json = JSON.parse(response.body)
        expect(@json["success"]).to eq false
        expect( @json["errors"]).to eq ["ログイン用の認証情報が正しくありません。再度お試しください。"]
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
end
