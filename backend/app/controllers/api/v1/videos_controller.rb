class Api::V1::VideosController < ApplicationController
  def search
    sorted_video = video_sort(Video)
    render json: sorted_video.as_json(except: %i[created_at updated_at])
  end

  private

  def video_params
    params.permit(:sort_criteria)
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
end
