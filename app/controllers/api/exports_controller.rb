# Library to handle csv files
require 'csv'

class Api::ExportsController < ApplicationController
  # Ensures only logged-in users can export
  before_action :authenticate_user!

  def create
    project = ResearchProject.find(params[:research_project_id])

    # Basic authorization - admins can export any project, researchers only their own
    unless current_user.role == "admin" || project.user_id == current_user.id
      return render json: { error: "Not authorized to export this project" }, status: :forbidden
    end

    metrics = project.metrics

    # respond_to Rails method that allows your controller actions to respond differently
    # based on the requested format (HTML, JSON, CSV, etc.).
    respond_to do |format|
      #  format.[type] defines how to handle a specific format
      format.csv do
        # Is only executed when the CSV format is requested
        # Contains the code to generate and send CSV data
        csv_data = generate_csv(project, metrics)
        # More verbose with the type and disposition
        # send_data csv_data,
        #   filename: "project-metrics.csv",
        #   type: "text/csv",
        #   disposition: "attachment"

        # Shorter version that rails understand the file type by  te .csv
        send_data csv_data, filename: "#{project.title.parameterize}-metrics-#{Date.today}.csv"
      end
    end
  end

  private

  def generate_csv(project, metrics)

    CSV.generate do |csv|
      # Header row
      csv << ["Project", "Metric Name", "Value", "Date", "Notes"]

      # Data rows
      metrics.each do |metric|
        csv << [
          project.title,
          metric.name,
          metric.value,
          metric.date,
          metric.description
        ]
      end
    end
  end
end
