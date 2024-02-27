class Country < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :world_view_countries, dependent: :destroy
  has_many :world_views, through: :world_view_countries

  validates :name, length: { maximum: 30 }, presence: true
  validates :code, length: { maximum: 30 }, presence: true
  validates :region, presence: true

  validate :validate_image

  alias_attribute :parent, :region

  def image_url
    url_for(portrait)
  end

  scope :filter_by_name, lambda { |names|
    return self if names.blank?

    where(name: [*names])
  }

  scope :filter_by_risk_level, lambda { |risk_level|
    return self if risk_level.blank?

    where(risk_level:)
  }

  scope :filter_by_bmi, lambda { |bmi_range|
    return self if bmi_range.blank?

    start_value, end_value = bmi_range
    where(bmi: start_value..end_value)
  }

  private

  def validate_image
    return unless portrait.attached? == false

    errors.add(:portrait, "が存在しません")
  end
end
