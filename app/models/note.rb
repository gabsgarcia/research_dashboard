class Note < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :metric

  # Validations
  validates :content, presence: true, length: { maximum: 1000 }
  validates :user_id, presence: true
  validates :metric_id, presence: true
end
