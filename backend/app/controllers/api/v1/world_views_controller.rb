class Api::V1::WorldViewsController < ApplicationController
  def index
    render json: WorldView.all.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                       methods: [:image_url])
  end

  def search
    filtered_world_views = WorldView.all
                                    .filter_by_category_name(world_view_params[:category_names])
                                    .filter_by_country_name(world_view_params[:country_names])
                                    .filter_by_characteristic_name(world_view_params[:characteristic_names])
                                    .filter_by_country_risk_level(world_view_params[:risk_levels])
                                    .filter_by_keyword(world_view_params[:keyword])
                                    .filter_by_country_bmi(world_view_params[:bmi_ranges])
                                    .filter_by_month(world_view_params[:months])
    sorted_world_views = case world_view_params[:sort_criteria]
                         when "latest"
                           filtered_world_views.sort_by_latest
                         when "bmi"
                           filtered_world_views.sort_by_country_bmi
                         when "riskLevel"
                           filtered_world_views.sort_by_country_risk_level
                         when "favorite"
                           filtered_world_views.sort_by_favorite_count
                         else
                           filtered_world_views
                         end
    render json: sorted_world_views.to_json(include: [:categories, :characteristics, :world_view_favorites,
                                                      { countries: { include: :state } }],
                                            methods: [:image_url])
  end

  private

  def world_view_params
    params.permit(:keyword, :sort_criteria, category_names: [], country_names: [], characteristic_names: [],
                                            risk_levels: [], months: [], bmi_ranges: [])
  end
end
