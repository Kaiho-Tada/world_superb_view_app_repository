class Api::V1::CountriesController < ApplicationController
  def index
    render json: Country.all.to_json(include: [:superb_views, :state])
  end
end
