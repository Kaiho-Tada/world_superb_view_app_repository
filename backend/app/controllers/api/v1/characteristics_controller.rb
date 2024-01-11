class Api::V1::CharacteristicsController < ApplicationController
  def index
    render json: Characteristic.select(:id, :name).as_json
  end
end
