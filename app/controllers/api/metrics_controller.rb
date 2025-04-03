class Api::MetricsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_research_project, only: [:index, :create]
  before_action :set_metric, only: [:show, :update, :destroy]

  def index
    # Add some debug logging
    Rails.logger.debug "Fetching metrics for project #{@research_project.id}"

    # Make sure we have a valid research project
    if @research_project
      metrics = @research_project.metrics
      render json: metrics
    else
      render json: { error: "Project not found" }, status: :not_found
    end
  rescue => e
    Rails.logger.error "Error in metrics#index: #{e.message}"
    render json: { error: "An error occurred while fetching metrics" }, status: :internal_server_error
  end

  def show
    render json: @metric
  end

  def create
    metric = @research_project.metrics.build(metric_params)

    if metric.save
      render json: metric, status: :created
    else
      render json: { errors: metric.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @metric.update(metric_params)
      render json: @metric
    else
      render json: { errors: @metric.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @metric.destroy
    render json: { message: "Metric deleted successfully" }
  end

  private

  def set_research_project
    @research_project = if current_user.admin?
                          ResearchProject.find(params[:research_project_id])
                        else
                          current_user.research_projects.find(params[:research_project_id])
                        end
  rescue ActiveRecord::RecordNotFound
    Rails.logger.error "Project not found: #{params[:research_project_id]}"
    render json: { error: "Project not found or access denied" }, status: :not_found
    nil
  end

  def set_metric
    @metric = if current_user.admin?
                Metric.find(params[:id])
              else
                current_user.research_projects.joins(:metrics).find_by(metrics: { id: params[:id] })&.metrics&.find(params[:id])
              end

    unless @metric
      render json: { error: "Metric not found or access denied" }, status: :not_found
    end
  end

  def metric_params
    params.require(:metric).permit(:name, :value, :date, :description)
  end
end
