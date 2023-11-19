class Api::V1::CharacteristicsController < ApplicationController
  def index
    render json: Characteristic.all.to_json(include: [:superb_views])
  end
end
