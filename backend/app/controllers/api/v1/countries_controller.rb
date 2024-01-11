class Api::V1::CountriesController < ApplicationController
  def index
    render json: Country.select(:id, :name, :state_id)
                        .preload(:state)
                        .as_json(include: { state: { except: %i[created_at updated_at
                                                                code] } })
  end
end
