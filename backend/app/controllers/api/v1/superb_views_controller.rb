class Api::V1::SuperbViewsController < ApplicationController
  def index
    render json: SuperbView.all.to_json(methods: [:image_url])
  end
end
