class User < ApplicationRecord
  # Devise modules
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  # Roles
  ROLES = %w[researcher admin].freeze

  # Associations
  has_many :research_projects, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :notes, dependent: :destroy

  # Validations
  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :role, presence: true, inclusion: { in: ROLES,
  message: "%{value} is not a valid role" }

  # Set default role for new users
  before_validation :set_default_role, on: :create

  # Helper methods for role checking
  def researcher?
    role == 'researcher'
  end

  def admin?
    role == 'admin'
  end

  private

  def set_default_role
    self.role ||= 'researcher'
  end
end
