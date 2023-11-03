class Country < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :state
  has_one_attached :portrait
  has_many :superb_view_countries, dependent: :destroy
  has_many :superb_views, through: :superb_view_countries

  validates :name, length: { maximum: 30 }, presence: true
  validates :code, length: { maximum: 30 }, presence: true
  validates :risk_level, length: { maximum: 1 }
  validate :validate_image

  def image_url
    url_for(portrait)
  end

  private

  def validate_image
    return unless portrait.attached? == false

    errors.add(:portrait, "が存在しません")
  end
end
