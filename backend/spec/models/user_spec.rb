require "rails_helper"

RSpec.describe User, type: :model do
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

  it "passwordとpassword(確認)の入力が不一致なら、無効な状態であること" do
    user = build(:user, password: "password", password_confirmation: "passward")
    user.valid?
    expect(user.errors.full_messages).to include("パスワード（確認用）とパスワードの入力が一致しません")
  end
end
