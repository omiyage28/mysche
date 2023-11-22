Rails.application.routes.draw do
  root "top#index"

   get "/schedules", to: "top#index"
  
  namespace :api, { format: "json" } do 
    namespace :v1 do
      resources :schedules, only: [:index]
    end
  end
end
