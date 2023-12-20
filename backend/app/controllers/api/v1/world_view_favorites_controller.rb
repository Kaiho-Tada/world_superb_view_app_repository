class Api::V1::WorldViewFavoritesController < ApplicationController
  def create
    if current_api_v1_user.nil?
      head :unauthorized
    else
      world_view_favorite = current_api_v1_user.world_view_favorites.create!(world_view_favorite_params)
      render json: world_view_favorite
    end
  end

  def destroy
    world_view_favorite = WorldViewFavorite.find(params[:id])
    world_view_favorite.destroy
    head :no_content
  end

  private

  def world_view_favorite_params
    params.require(:world_view_favorites).permit(:world_view_id)
  end
end
