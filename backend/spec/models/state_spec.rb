require "rails_helper"

RSpec.describe State, type: :model do
  describe "バリデーションのテスト" do
    it "name, code, 画像データが存在する場合、有効な状態であること" do
      expect(build(:state)).to be_valid
    end

    context "nameカラム" do
      it "nameがない場合、無効な状態であること" do
        state = build(:state, name: nil)
        state.valid?
        expect(state.errors.full_messages).to eq ["州名を入力してください"]
      end

      it "nameは30文字以内であること" do
        state = build(:state, name: "a" * 31)
        state.valid?
        expect(state.errors.full_messages).to eq ["州名は30文字以内で入力してください"]
      end
    end

    context "codeカラム" do
      it "codeがない場合、無効な状態であること" do
        state = build(:state, code: nil)
        state.valid?
        expect(state.errors.full_messages).to eq ["コードを入力してください"]
      end

      it "codeは30文字以内であること" do
        state = build(:state, code: "a" * 31)
        state.valid?
        expect(state.errors.full_messages).to eq ["コードは30文字以内で入力してください"]
      end
    end

    context "portraitカラム" do
      it "画像データがない場合、無効な状態であること" do
        state = build(:state, portrait: nil)
        state.valid?
        expect(state.errors.full_messages).to eq ["画像データが存在しません"]
      end
    end
  end

  describe "インスタンスメソッドのテスト" do
    let!(:state) { create(:state) }

    it "image_urlメソッドで生成されるurlが意図した形式であること" do
      expect(state.image_url).to match(%r{http://localhost:3001/rails/active_storage/blobs/redirect/.+/test_image.jpeg})
    end
  end
end
