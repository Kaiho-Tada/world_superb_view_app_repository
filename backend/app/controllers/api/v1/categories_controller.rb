class Api::V1::CategoriesController < ApplicationController
  def index
    render json: Category.select(:id, :name, :classification).as_json
  end
end
