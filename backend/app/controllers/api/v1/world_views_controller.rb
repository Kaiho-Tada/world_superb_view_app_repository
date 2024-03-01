class Api::V1::WorldViewsController < ApplicationController
  def search
    filtered_world_views = world_view_filter(WorldView)
    sorted_world_views = filtered_world_views.sort_order_by(world_view_params[:sort_criteria])
    render json: sorted_world_views.preload(:categories, :characteristics, :world_view_favorites, :countries, :videos)
                                   .as_json(except: %i[created_at updated_at],
                                            include: [{ categories: { only: %i[id name] } },
                                                      { characteristics: { only: %i[id name] } },
                                                      { world_view_favorites: { only: %i[id user_id] } },
                                                      { countries: { only: %i[id name risk_level bmi] } },
                                                      { videos: { only: %i[id title poster_path popularity vote_average
                                                                           release_date overview] } }])
  end

  private

  def world_view_params
    params.permit(:keyword, :sort_criteria, :risk_level, category_names: [], country_names: [],
                                                         characteristic_names: [], month_range: [], bmi_range: [])
  end

  def world_view_filter(model)
    model.filter_by_name(world_view_params[:category_names], "category")
         .filter_by_name(world_view_params[:country_names], "country")
         .filter_by_name(world_view_params[:characteristic_names], "characteristic")
         .filter_by_country_risk_level(world_view_params[:risk_level])
         .filter_by_keyword(world_view_params[:keyword])
         .filter_by_country_bmi(world_view_params[:bmi_range])
         .filter_by_month(world_view_params[:month_range])
  end
end
