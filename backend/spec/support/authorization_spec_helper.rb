module AuthorizationSpecHelper
  def sign_in(user)
    post api_v1_user_session_path, params: {
      email: user.email,
      password: user.password
    }
    response.headers.slice("client", "access-token", "uid")
  end

  def guest_login
    post api_v1_auth_sessions_guest_login_path
    response.headers.slice("client", "access-token", "uid")
  end
end
