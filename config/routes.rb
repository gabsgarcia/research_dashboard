Rails.application.routes.draw do
  devise_for :users

  # API routes
  namespace :api do
    resources :research_projects, only: [:index, :show, :create, :update, :destroy] do
      resources :metrics, only: [:index]

      # Export route
      post 'export', to: 'exports#create'

      # Favorite routes
      post 'favorite', to: 'favorites#create'
      delete 'favorite', to: 'favorites#destroy'
    end

    resources :metrics, only: [:show, :create, :update, :destroy]
    resources :notes, only: [:create, :update, :destroy]

    # Get user's favorites
    get 'favorites', to: 'research_projects#favorites'
  end

  # Root path
  root 'home#index'

  # Catch-all for React frontend routing
  get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
