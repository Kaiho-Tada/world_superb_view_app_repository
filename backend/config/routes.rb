Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/sessions",
        passwords: "api/v1/auth/passwords"
      }

      devise_scope :api_v1_user do
        namespace :auth do
          resources :sessions, only: %i[index]
          post "/sessions/guest_login", to: "sessions#guest_login"
        end
      end

      resources :world_views, only: [:index]
      get "/world_views/search", to: "world_views#search"

      resources :countries, only: [:index]
      resources :categories, only: [:index]
      resources :characteristics, only: [:index]
      resources :world_view_favorites, only: [:create, :destroy]
    end
  end
end
