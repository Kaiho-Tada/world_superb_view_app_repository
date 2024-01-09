class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def index
    if current_api_v1_user
      render json: { status: 200, current_user: current_api_v1_user }
    else
      render json: { status: 500 }
    end
  end

  def guest_login
    @resource = User.guest
    @token = @resource.create_token
    @resource.save!
    render_create_success
  end

  def destroy
    reset_guest_data if current_api_v1_user.email == "guest@example.com"
    super
  end

  private

  def reset_guest_data
    guest_user = User.find_by(email: "guest@example.com")
    guest_user.world_view_favorites.destroy_all if guest_user.world_view_favorites.any?
  end
end
