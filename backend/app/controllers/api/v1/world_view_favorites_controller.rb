class Api::V1::WorldViewFavoritesController < ApplicationController
  def create
    if current_api_v1_user.nil?
      head :unauthorized
    else
      world_view_favorite = current_api_v1_user.world_view_favorites.create!(world_view_favorite_params)
      render json: world_view_favorite, only: [:id, :user_id]
    end
    rescue StandardError => e
      ErrorUtility.log_and_notify(e)
      render json: { error: "お気に入り登録に失敗しました。" }, status: :internal_server_error
  end

  def destroy
    world_view_favorite = WorldViewFavorite.find(params[:id])
    world_view_favorite.destroy
    head :no_content
  rescue StandardError => e
    ErrorUtility.log_and_notify(e)
    render json: { error: "お気に入り削除に失敗しました。" }, status: :internal_server_error
  end

  private

  def world_view_favorite_params
    params.require(:world_view_favorites).permit(:world_view_id)
  end
end
