class Api::V1::CategoriesController < ApplicationController
  def index
    render json: Category.select(:id, :name, :classification).as_json(methods: [:parent])
  rescue StandardError => e
    ErrorUtility.log_and_notify(e)
    render json: { error: "Categoryモデルの取得に失敗しました。" }, status: :internal_server_error
  end
end
