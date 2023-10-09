require "rails_helper"

RSpec.describe User, type: :model do
  describe "新規作成のテスト" do
    it "email、passwordのフォーマットが正しい場合、登録できること" do
      expect(build(:user)).to be_valid
    end

    it "emailが存在しなければ無効な状態であること" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors.full_messages).to include("Eメールを入力してください")
    end

    it "passwordが存在しなければ無効な状態であること" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors.full_messages).to include("パスワードを入力してください")
    end

    it "重複したメールアドレスなら無効な状態であること" do
      create(:user, email: "test@example.com")
      user = build(:user, email: "test@example.com")
      user.valid?
      expect(user.errors.full_messages).to include("Eメールはすでに存在します")
    end

    it "passwordが5文字以下なら無効な状態であること" do
      user = build(:user, password: "passw")
      user.valid?
      expect(user.errors.full_messages).to include("パスワードは6文字以上で入力してください")
    end
  end

  describe "更新のテスト" do
    describe "プロフィールの更新のテスト" do
      let!(:user) { create(:user) }
      it "プロフィールを更新できること" do
        user.update(name: "new_name", nickname: "new_nickname", email: "new_test@example.com")
        expect(user.name).to eq "new_name"
        expect(user.nickname).to eq "new_nickname"
        expect(user.email).to eq "new_test@example.com"
      end

      it "emailが空文字列の場合、プロフィールの更新に失敗すること" do
        user.update(name: "name", nickname: "nickname", email: "")
        expect(user.errors.full_messages).to include("Eメールを入力してください")
      end

      it "emailのフォーマットが正しくない場合、プロフィールの更新に失敗すること" do
        user.update(name: "name", nickname: "nickname", email: "test.example.com")
        expect(user.errors.full_messages).to include("Eメールは有効ではありません")
      end
    end

    describe "パスワードの更新のテスト" do
      let!(:user) { create(:user) }
      it "パスワードを更新できること" do
        user.update(password: "new_password", password_confirmation: "new_password")
        expect(user.password).to eq "new_password"
        expect(user.password_confirmation).to eq "new_password"
      end

      it "password5文字以下の場合、パスワード更新に失敗すること" do
        user.update(password: "pass", password_confirmation: "pass")
        expect(user.errors.full_messages).to include("パスワードは6文字以上で入力してください")
      end

      it "passwordとpassword(確認)の入力が不一致なら、パスワード更新に失敗すること" do
        user.update(password: "password", password_confirmation: "passward")
        expect(user.errors.full_messages).to include("パスワード（確認用）とパスワードの入力が一致しません")
      end
    end

    describe "ユーザー削除のテスト" do
      let!(:user1) { create(:user) }
      let!(:user2) { create(:user) }
      it "ユーザー削除できること" do
        expect(User.all).to include(user1, user2)
        user1.destroy
        expect(User.all).to include(user2)
      end
    end
  end
end
