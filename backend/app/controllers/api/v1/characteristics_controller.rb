class Api::V1::CharacteristicsController < ApplicationController
  def index
    render json: Characteristic.select(:id, :name).as_json
  rescue StandardError => e
    ErrorUtility.log_and_notify(e)
    render json: { error: "Characteristicモデルの取得に失敗しました。" }, status: :internal_server_error
  end
end
