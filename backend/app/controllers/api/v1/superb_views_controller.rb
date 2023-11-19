class Api::V1::SuperbViewsController < ApplicationController
  def index
    render json: SuperbView.all.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                        methods: [:image_url])
  end

  def search
    superb_views = SuperbView.all
                             .filter_by_category_name(superb_view_params[:category_names])
                             .filter_by_country_name(superb_view_params[:country_names])
                             .filter_by_characteristic_name(superb_view_params[:characteristic_names])
                             .filter_by_country_risk_level(superb_view_params[:risk_levels])
    render json: superb_views.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                      methods: [:image_url])
  end

  private

  def superb_view_params
    params.permit(category_names: [], country_names: [], characteristic_names: [], risk_levels: [])
  end
end
