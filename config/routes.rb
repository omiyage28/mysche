Rails.application.routes.draw do
  root "top#index"
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
    get "/top", to: "top#index"
    get "/schedules", to: "top#index"
    get "/sign_in", to: "top#index"
    get "/sign_up", to: "top#index"
    get "/password_reset", to: "top#index"

  
  namespace :api, { format: "json" } do 
    namespace :v1 do
      resources :schedules, only: [:index, :create, :update, :destroy]
    end
  end
end
