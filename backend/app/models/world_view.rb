class WorldView < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :portrait
  has_many :world_view_countries, dependent: :destroy
  has_many :countries, through: :world_view_countries
  has_many :world_view_categories, dependent: :destroy
  has_many :categories, through: :world_view_categories
  has_many :world_view_characteristics, dependent: :destroy
  has_many :characteristics, through: :world_view_characteristics
  has_many :world_view_favorites, dependent: :destroy
  has_many :users, through: :world_view_favorites
  has_many :world_view_videos, dependent: :destroy
  has_many :videos, through: :world_view_videos

  validates :name, length: { maximum: 30 }, presence: true
  validates :best_season, length: { maximum: 30 }, presence: true

  scope :filter_by_category_name, lambda { |category_names|
    return self if category_names.blank?

    categories = Category
                 .all
                 .filter_by_name(category_names)
    category_ids = categories.map(&:id).join(",")

    if category_ids.present?
      joins(:categories).where("categories.id IN (#{category_ids})").distinct
    else
      none
    end
  }

  scope :filter_by_country_name, lambda { |country_names|
    return self if country_names.blank?

    countries = Country
                .all
                .filter_by_name(country_names)
    country_ids = countries&.map(&:id)&.join(",")

    if country_ids.present?
      joins(:countries).where("countries.id IN (#{country_ids})").distinct
    else
      none
    end
  }

  scope :filter_by_characteristic_name, lambda { |characteristic_names|
    return self if characteristic_names.blank?

    characteristics = Characteristic
                      .all
                      .filter_by_name(characteristic_names)
    characteristic_ids = characteristics&.map(&:id)&.join(",")

    if characteristic_ids.present?
      joins(:characteristics).where("characteristics.id IN (#{characteristic_ids})").distinct
    else
      none
    end
  }

  scope :filter_by_country_risk_level, lambda { |risk_level|
    return self if risk_level.blank?

    countries = Country
                .all
                .filter_by_risk_level(risk_level)
    country_ids = countries&.map(&:id)&.join(",")
    if country_ids.present?
      joins(:countries).where("countries.id IN (#{country_ids})").distinct
    else
      none
    end
  }

  scope :filter_by_keyword, lambda { |keyword|
    return self if keyword.blank?

    joins(:countries)
      .where("world_views.name LIKE(?) or countries.name LIKE(?)", "%#{keyword}%", "%#{keyword}%").distinct
  }

  scope :filter_by_month, lambda { |month_range|
    return self if month_range == ["1", "12"]

    start_value, end_value = month_range.map(&:to_i)
    months = (start_value..end_value).to_a
    world_view_ids = WorldView.select do |world_view|
      (extract_months_range(world_view.best_season) & months).any?
    end.pluck(:id)
    where(id: world_view_ids)
  }

  scope :filter_by_country_bmi, lambda { |bmi_range|
    return self if bmi_range == ["-40", "30"]

    if bmi_range[0] == bmi_range[1]
      countries = Country.where(bmi: bmi_range[0])
    else
      countries = Country.filter_by_bmi(bmi_range)
    end
    country_ids = countries&.map(&:id)&.join(",")
    if country_ids.present?
      joins(:countries).where("countries.id IN (#{country_ids})").distinct
    else
      none
    end
  }

  scope :sort_by_latest, lambda {
    order(created_at: :desc)
  }

  scope :sort_by_country_bmi, lambda {
    joins(:countries).group("world_views.id").order("MIN(countries.bmi) ASC")
  }

  scope :sort_by_country_risk_level, lambda {
    joins(:countries).group("world_views.id").order("MIN(countries.risk_level) ASC")
  }

  scope :sort_by_favorite_count, lambda {
    left_joins(:world_view_favorites)
      .group(:id)
      .order("COUNT(world_view_favorites.id) DESC")
  }

  def self.extract_months_range(input)
    ranges = input.scan(/(\d+)月〜(\d+)月/)

    ranges.flat_map do |start_month, end_month|
      start_month = start_month.to_i
      end_month = end_month.to_i

      if start_month > end_month
        (start_month..12).to_a + (1..end_month).to_a
      else
        (start_month..end_month).to_a
      end
    end
  end
end
