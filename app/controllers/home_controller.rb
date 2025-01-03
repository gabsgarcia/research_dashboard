class HomeController < ApplicationController
  # Skip authentication for index action
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # Redirect to login if not signed in
    redirect_to new_user_session_path unless user_signed_in?
  end
end
