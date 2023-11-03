class Api::V1::SuperbViewsController < ApplicationController
  def index
    render json: SuperbView.all.to_json(include: [:categories, :characteristics, { countries: { include: :state } }],
                                        methods: [:image_url])
  end
end
