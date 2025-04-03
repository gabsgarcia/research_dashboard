class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # This action simply renders the React app container
  end

  def show
    # This will serve the project details page
    # We're just rendering the template - React will handle the data fetching
    render template: "dashboard/show"
  end
end
