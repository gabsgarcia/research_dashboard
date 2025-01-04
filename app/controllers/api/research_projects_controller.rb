class Api::ResearchProjectsController < ApplicationController
  # ensures a user is logged in before any action in this controller can be executed
  before_action :authenticate_user!
  # set the research project before those actions
  before_action :set_research_project, only: [:show, :update, :destroy]

  def index
    # For admins, show all projects
    # For researchers, show only their projects
    projects = if current_user.admin?
                ResearchProject.all
              else
                current_user.research_projects
              end

    # Converts the projects to JSON and sends them to the frontend
    render json: projects
  end

  def show
    # Just renders the pre-loaded project with before action as JSON
    render json: @research_project
  end

  def create
    # Combines the creation and association in one step
    research_project = current_user.research_projects.build(research_project_params)

    if research_project.save
      render json: research_project, status: :created
    else
      render json: { errors: research_project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @research_project.update(research_project_params)
      render json: @research_project
    else
      render json: { errors: @research_project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @research_project.destroy
    render json: { message: "Project deleted successfully" }
  end

  # Get user's favorite projects
  def favorites
    favorite_projects = current_user.favorite_projects
    render json: favorite_projects
  end

  private

  def set_research_project
    # Allow admins to access any project, but researchers only their own
    @research_project = if current_user.admin?
                          ResearchProject.find(params[:id])
                        else
                          current_user.research_projects.find(params[:id])
                        end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Project not found or access denied" }, status: :not_found
  end

  def research_project_params
    params.require(:research_project).permit(:title, :description, :category, :start_date, :end_date, :status)
  end
end
