class Api::V1::MoviesController < ApplicationController
  def search
    render json: Movie.all.as_json(except: %i[created_at updated_at])
  end
end
