class Api::V1::CharacteristicsController < ApplicationController
  def index
    render json: Characteristic.all.to_json(include: [:world_views])
  end
end
