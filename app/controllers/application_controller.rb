class ApplicationController < ActionController::Base
  # Skip forgery protection for API requests
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  # Ensure authentication for all controllers except where explicitly skipped
  before_action :authenticate_user!

  # Configure permitted parameters for Devise
  before_action :configure_permitted_parameters, if: :devise_controller?

  # Handle API unauthorized errors
  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    respond_to do |format|
      format.html { redirect_to new_user_session_path, alert: 'Your session has expired. Please sign in again.' }
      format.json { render json: { error: 'Session expired' }, status: :unauthorized }
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :role])
  end
end
