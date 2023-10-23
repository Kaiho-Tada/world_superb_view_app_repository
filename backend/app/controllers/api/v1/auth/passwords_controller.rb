class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :check_guest_user, only: :update

  private

  def check_guest_user
    uid = request.headers["uid"]
    return unless uid == "guest@example.com"

    render json: { status: 403, message: "ゲストユーザーは許可されていません。" }
  end
end
