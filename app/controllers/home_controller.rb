class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # Just render the template, don't add any logic here
    render layout: 'application'
  end
end
