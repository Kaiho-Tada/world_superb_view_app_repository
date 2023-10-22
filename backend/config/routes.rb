Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        passwords: "api/v1/auth/passwords"
      }

      devise_scope :api_v1_user do
        namespace :auth do
          resources :sessions, only: %i[index]
          post "/sessions/guest_login", to: "sessions#guest_login"
        end
      end
    end
  end
end
