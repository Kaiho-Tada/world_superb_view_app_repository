class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password)
  end

  def account_update_params
    params.permit(:name, :nickname, :email)
  end
end
