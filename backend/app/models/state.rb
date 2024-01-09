class State < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :countries, dependent: :destroy

  validates :name, length: { maximum: 30 }, presence: true
  validates :code, length: { maximum: 30 }, presence: true
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
