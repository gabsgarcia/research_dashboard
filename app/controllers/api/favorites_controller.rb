class Api::FavoritesController < ApplicationController
  # Ensures only logged-in users can favorite projects
  before_action :authenticate_user!

  def create
    # Create a favorite associated with the current user
    favorite = current_user.favorites.build(research_project_id: params[:research_project_id])

    # Returns a JSON success response or validation errors
    # Remember using React for the frontend,
    # needs JSON data rather than rendered HTML
    if favorite.save
      render json: { success: true, message: "Project added to favorites" }
    else
      render json: { success: false, errors: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # Finds the specific favorite for this user and project
    favorite = current_user.favorites.find_by(research_project_id: params[:research_project_id])

    # It only calls destroy if favorite exists
    if favorite&.destroy
      render json: { success: true, message: "Project removed from favorites" }
    else
      render json: { success: false, message: "Favorite not found" }, status: :not_found
    end
  end
end
