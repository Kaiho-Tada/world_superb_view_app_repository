class Country < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :world_view_countries, dependent: :destroy
  has_many :world_views, through: :world_view_countries

  validates :name, length: { maximum: 30 }, presence: true
  validates :code, length: { maximum: 30 }, presence: true
  validates :risk_level, length: { maximum: 1 }
  validates :region, presence: true

  validate :validate_image

  alias_attribute :parent, :region

  def image_url
    url_for(portrait)
  end

  scope :filter_by_name, lambda { |names|
    where(name: [*names])
  }

  scope :filter_by_risk_level, lambda { |risk_levels|
    where(risk_level: [*risk_levels])
  }

  scope :filter_by_bmi, lambda { |bmi_ranges|
    return self if bmi_ranges.nil?

    parsed_ranges = bmi_ranges.map do |bmi_range|
      parse_range(bmi_range)
    end
    where(parsed_ranges.map { |range| "bmi BETWEEN #{range.begin} AND #{range.end}" }.join(" OR "))
  }

  def self.parse_range(range)
    start_value, end_value = range.scan(/(-?\d*)%?〜(-?\d*)%?/).flatten
    start_value = start_value.empty? ? -100 : start_value.to_i
    end_value = end_value.empty? ? 100 : end_value.to_i
    (start_value..end_value)
  end

  private

  def validate_image
    return unless portrait.attached? == false

    errors.add(:portrait, "が存在しません")
  end
end
