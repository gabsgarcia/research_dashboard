class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # This action simply renders the React app container
    # All data will be fetched via API calls
  end

  def show
    # This will serve the project details page
    # React will handle fetching the appropriate data
    render template: "home/index"
  end
end
