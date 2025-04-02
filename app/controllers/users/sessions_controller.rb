class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json

  def check_logged_in
    if user_signed_in?
      render json: { logged_in: true }, status: :ok
    else
      render json: { logged_in: false }, status: :unauthorized
    end
  end

  # You can include other overridden Devise methods here if needed
end
