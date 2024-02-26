class Api::V1::CountriesController < ApplicationController
  def index
    render json: Country.select(:id, :name, :region).as_json(methods: [:parent])
  end
end
