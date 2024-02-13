class Api::V1::GenresController < ApplicationController
  def index
    render json: Genre.select(:id, :name).as_json
  end
end
