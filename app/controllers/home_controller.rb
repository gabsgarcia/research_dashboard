class HomeController < ApplicationController
  # Skip authentication for index action
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # React will handle the UI once the page loads
    # Just serve the empty container
  end
end
