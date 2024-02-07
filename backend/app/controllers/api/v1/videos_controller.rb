class Api::V1::VideosController < ApplicationController
  def search
    render json: Video.all.as_json(except: %i[created_at updated_at])
  end
end
