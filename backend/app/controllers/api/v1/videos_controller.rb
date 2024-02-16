class Api::V1::VideosController < ApplicationController
  def search
    sorted_video = video_sort(Video)
    filtered_video = video_filter(sorted_video)
    render json: filtered_video.as_json(except: %i[created_at updated_at])
  end

  private

  def video_params
    params.permit(:sort_criteria, :keyword, genre_labels: [], vote_average_range: [])
  end

  def video_sort(video)
    case video_params[:sort_criteria]
    when "popularity"
      video.sort_by_popularity
    when "voteAverage"
      video.sort_by_vote_average
    when "releaseDate"
      video.sort_by_release_date
    when ""
      Video.all
    else
      raise ArgumentError, "Invalid sort criteria: #{video_params[:sort_criteria]}"
    end
  end

  def video_filter(video)
    video.filter_by_genre(video_params[:genre_labels])
         .filter_by_keyword(video_params[:keyword])
         .filter_by_vote_average(video_params[:vote_average_range])
  end
end
