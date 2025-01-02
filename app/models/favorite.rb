class Favorite < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :research_project

  # Validations
  validates :user_id, presence: true
  validates :research_project_id, presence: true
  validates :user_id, uniqueness: { scope: :research_project_id,
                    message: "has already favorited this project" }
end
