Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  devise_scope :user do
    get '/users/check_logged_in', to: 'users/sessions#check_logged_in'
  end

  # API routes
  namespace :api do
    resources :research_projects, only: [:index, :show, :create, :update, :destroy] do
      resources :metrics, only: [:index, :create]

      # Export route
      post 'export', to: 'exports#create'
      get 'export', to: 'exports#create', on: :member

      # Favorite routes
      post 'favorite', to: 'favorites#create'
      delete 'favorite', to: 'favorites#destroy'
    end

    # Metrics with nested notes
    resources :metrics, only: [:show, :update, :destroy] do
      resources :notes, only: [:index], controller: 'notes'
    end

    resources :notes, only: [:create, :update, :destroy]

    # Get user's favorites
    resources :favorites, only: [:index]
    get 'favorites', to: 'research_projects#favorites'
  end

  # Frontend routes - Using DashboardController
  get 'projects/:id', to: 'dashboard#show', as: 'project'

  # Root path
  root 'home#index'

  # Dashboard root
  get 'dashboard', to: 'dashboard#index'

  # Catch-all for React routing
  get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
