require "rails_helper"

RSpec.describe Movie, type: :model do
  describe "バリデーションのテスト" do
    it "必要な属性が正しく設定されている場合、有効な状態であること" do
      expect(build(:movie)).to be_valid
    end

    it "titleカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, title: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["タイトルを入力してください"]
    end

    it "poster_pathカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, poster_path: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["ポスターパスを入力してください"]
    end

    it "budgetカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, budget: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["予算を入力してください"]
    end

    it "revenueカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, revenue: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["収益を入力してください"]
    end

    it "popularityカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, popularity: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["人気度を入力してください"]
    end

    it "vote_averageカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, vote_average: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["評価を入力してください"]
    end

    it "release_dateカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, release_date: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["公開日を入力してください"]
    end

    it "statusカラムが設定されていない場合、無効な状態であること" do
      movie = build(:movie, status: nil)
      movie.valid?
      expect(movie.errors.full_messages).to eq ["ステイタスを入力してください"]
    end
  end
end
