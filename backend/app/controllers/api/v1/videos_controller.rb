class Api::V1::VideosController < ApplicationController
  def search
    filtered_video = video_filter(Video)
    sorted_video = filtered_video.order_by(video_params[:sort_criteria])
    render json: sorted_video.preload(:genres, :world_views, world_views: [:countries])
                             .as_json(except: %i[created_at updated_at],
                                      include: [{ genres: { only: %i[id name] } },
                                                { world_views: { only: %i[id name img_url latitude longitude],
                                                                 include: { countries: { only: [:id, :name] } } } }])
  end

  private

  def video_params
    params.permit(:sort_criteria, :keyword, genre_labels: [], vote_average_range: [])
  end

  def video_filter(video)
    video.filter_by_genre(video_params[:genre_labels])
         .filter_by_keyword(video_params[:keyword])
         .filter_by_vote_average(video_params[:vote_average_range])
  end
end
