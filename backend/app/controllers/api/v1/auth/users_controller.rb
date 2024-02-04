class Api::V1::Auth::UsersController < ApplicationController
  def index
    render json: User.where.not(role: ["admin", "guest"]).select(%i[id email name nickname]).as_json
  rescue StandardError => e
    ErrorUtility.log_and_notify(e)
    render json: { error: "Userモデルの取得に失敗しました。" }, status: :internal_server_error
  end

  def destroy
    user = User.find(params[:id])
    user.destroy!
    render json: { message: "'#{user.email}'のアカウントは削除されました。" }
  end
end
