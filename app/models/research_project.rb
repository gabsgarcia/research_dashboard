class ResearchProject < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :metrics, dependent: :destroy
  has_many :favorites, dependent: :destroy

  # Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, presence: true
  validates :category, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :status, presence: true, inclusion: { in: %w[active completed paused cancelled],
                    message: "%{value} is not a valid status" }

  # checks if the end date is after the start date
  validate :end_date_after_start_date

  # Scopes
  # It returns all research projects with the status "active"
  scope :active, -> { where(status: 'active') }
  # It returns all research projects with the status "completed"
  scope :completed, -> { where(status: 'completed') }
  # It filters projects by the specified category, but only if a category was provided
  scope :by_category, ->(category) { where(category: category) if category.present? }

  # Calculate duration in days
  def duration_days
    return nil if start_date.nil? || end_date.nil?
    (end_date - start_date).to_i
  end

  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "must be after the start date")
    end
  end
end
