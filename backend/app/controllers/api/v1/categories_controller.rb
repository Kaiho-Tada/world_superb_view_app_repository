class Api::V1::CategoriesController < ApplicationController
  def index
    render json: Category.all.to_json(include: [:superb_views])
  end
end
