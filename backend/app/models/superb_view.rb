class SuperbView < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :superb_view_countries, dependent: :destroy
  has_many :countries, through: :superb_view_countries
  has_many :superb_view_categories, dependent: :destroy
  has_many :categories, through: :superb_view_categories
  has_many :superb_view_characteristics, dependent: :destroy
  has_many :characteristics, through: :superb_view_characteristics

  validates :name, length: { maximum: 30 }, presence: true
  validates :panorama_url, presence: true
  validates :best_season, length: { maximum: 30 }, presence: true
  validate :validate_image

  def image_url
    url_for(portrait)
  end

  scope :filter_by_category_name, lambda { |category_names|
    return self if category_names.nil?

    categories = Category
                 .all
                 .filter_by_name(category_names)
    category_ids = categories.map(&:id).join(",")

    joins(:categories).where("categories.id IN (#{category_ids})").distinct
  }

  scope :filter_by_country_name, lambda { |country_names|
    return self if country_names.nil?

    countries = Country
                .all
                .filter_by_name(country_names)
    country_ids = countries&.map(&:id)&.join(",")

    joins(:countries).where("countries.id IN (#{country_ids})").distinct
  }

  scope :filter_by_characteristic_name, lambda { |characteristic_names|
    return self if characteristic_names.nil?

    characteristics = Characteristic
                      .all
                      .filter_by_name(characteristic_names)
    characteristic_ids = characteristics&.map(&:id)&.join(",")

    joins(:characteristics).where("characteristics.id IN (#{characteristic_ids})").distinct
  }

  scope :filter_by_country_risk_level, lambda { |risk_levels|
    return self if risk_levels.blank?

    countries = Country
                .all
                .filter_by_risk_level(risk_levels)

    country_ids = countries&.map(&:id)&.join(",")
    joins(:countries).where("countries.id IN (#{country_ids})").distinct
  }

  private

  def validate_image
    return unless portrait.attached? == false

    errors.add(:portrait, "が存在しません")
  end
end
