class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # This action simply renders the React app container
    # All data will be fetched via API calls
  end
end
