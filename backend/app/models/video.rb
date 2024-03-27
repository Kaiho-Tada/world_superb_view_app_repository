class Video < ApplicationRecord
  has_many :world_view_videos, dependent: :destroy
  has_many :world_views, through: :world_view_videos
  has_many :video_genres, dependent: :destroy
  has_many :genres, through: :video_genres

  validates :title, presence: true, uniqueness: true
  validates :poster_path, presence: true
  validates :popularity, presence: true
  validates :vote_average, presence: true
  validates :release_date, presence: true

  scope :filter_by_genre, lambda { |genre_labels|
    return self if genre_labels.blank?

    genres = Genre.filter_by_name(genre_labels)
    genre_ids = genres.map(&:id).join(",")
    joins(:genres).where("genres.id IN (#{genre_ids})").distinct
  }

  scope :filter_by_keyword, lambda { |keyword|
    return self if keyword.blank?

    where("title LIKE(?)", "%#{keyword}%").distinct
  }

  scope :filter_by_vote_average, lambda { |vote_average_range|
    return self if vote_average_range.blank?

    start_value, end_value = vote_average_range
    where(vote_average: start_value..end_value)
  }

  scope :order_by, lambda { |sort_criteria|
    case sort_criteria
    when "popularity"     then order(popularity: :desc)
    when "voteAverage"    then order(vote_average: :desc)
    when "releaseDate"    then order(release_date: :desc)
    when ""               then self
    else
      raise ArgumentError, "Invalid sort criteria: #{sort_criteria}"
    end
  }
end
