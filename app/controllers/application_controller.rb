class ApplicationController < ActionController::Base
  # Enable authentication for all controllers
  before_action :authenticate_user!

  # Configure permitted parameters for Devise
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :role])
  end
end
