class Api::V1::CountriesController < ApplicationController
  def index
    render json: Country.select(:id, :name, :state_id)
                        .preload(:state)
                        .as_json(include: { state: { except: %i[created_at updated_at
                                                                code] } })
    rescue StandardError => e
      ErrorUtility.log_and_notify(e)
      render json: { error: "Countryモデルの取得に失敗しました。" }, status: :internal_server_error
  end
end
