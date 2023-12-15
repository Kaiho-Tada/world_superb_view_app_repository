class Api::V1::CategoriesController < ApplicationController
  def index
    render json: Category.all.to_json(include: [:world_views])
  end
end
