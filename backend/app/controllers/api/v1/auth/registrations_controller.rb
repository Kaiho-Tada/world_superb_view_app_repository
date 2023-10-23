class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :check_guest_user, only: [:destroy, :update]

  private

  def sign_up_params
    params.permit(:email, :password)
  end

  def account_update_params
    params.permit(:name, :nickname, :email)
  end

  def check_guest_user
    uid = request.headers["uid"]
    return unless uid == "guest@example.com"

    render json: { status: 403, message: "ゲストユーザーは許可されていません。" }
  end
end
