class Metric < ApplicationRecord
  # Associations
  belongs_to :research_project
  has_many :notes, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :value, presence: true, numericality: true
  validates :date, presence: true

  # Ensures metric dates fall within the timeline of their parent research project
  validate :date_within_project_timeline

  # Scopes
  # Find all metrics with a specific name
  scope :by_name, ->(name) { where(name: name) if name.present? }
  # Display metrics in chronological order (timeline view)
  scope :chronological, -> { order(date: :asc) }
  # Display metrics with the most recent data at the top
  scope :recent_first, -> { order(date: :desc) }

  private

  def date_within_project_timeline
    # Skip validation if the metric doesn't have a date set or isn't associated with a project yet
    return if date.blank? || research_project.blank?
    # Skip validation if the project doesn't have both start and end dates defined
    return if research_project.start_date.blank? || research_project.end_date.blank?

    # Checks if the date falls between the project's start and end dates
    unless date.between?(research_project.start_date, research_project.end_date)
      errors.add(:date, "must be within the project's timeline")
    end
  end
end
